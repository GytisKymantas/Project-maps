import { Button, List, Space, Tooltip, Typography } from 'antd';
import React from 'react';
import {
  useCreateFavoriteCityMutation,
  useDeleteFavoriteCityMutation,
} from '../../api';
import { HeartOutlined, HeartFilled, TeamOutlined } from '@ant-design/icons';
import * as S from './CitiesList.styled';

interface ListItemProps {
  flyToCity: (payload: { lat: string; lng: string }) => void;
  id: number;
  isFavorite: boolean;
  isFavoriteToggled?: boolean;
  color: string;
  city: string;
  lat: string;
  lng: string;
}
const ListItem: React.FC<ListItemProps> = ({
  id,
  isFavorite,
  color,
  city,
  lat,
  lng,
  flyToCity,
}) => {
  const [createFavoriteCity] = useCreateFavoriteCityMutation();
  const [deleteFavoriteCity] = useDeleteFavoriteCityMutation();
  console.log('one');

  return (
    <List.Item
      key={id}
      onClick={() => flyToCity({ lat, lng })}
      actions={[
        <Tooltip
          key='favorites'
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Button
            type='text'
            icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
            onClick={() => {
              isFavorite ? deleteFavoriteCity(id) : createFavoriteCity(id);
            }}
          />
        </Tooltip>,
      ]}
    >
      <Space size='large'>
        <S.CityAvatar color={color} icon={<TeamOutlined />} />
        <Typography.Text strong style={{ margin: 0 }}>
          {city}
        </Typography.Text>
      </Space>
    </List.Item>
  );
};

export default React.memo(ListItem);
