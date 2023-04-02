import React, { useEffect, useRef, useState } from 'react';
import { Button, List, Space, Tooltip, Typography } from 'antd';
import {
  useCreateFavoriteCityMutation,
  useDeleteFavoriteCityMutation,
  useGetAllCitiesQuery,
  useGetFavoriteCitiesIdsQuery,
} from '../../api';
import { HeartOutlined, HeartFilled, TeamOutlined } from '@ant-design/icons';
import * as S from './CitiesList.styled';

type Props = {
  flyToCity: (payload: { lat: string; lng: string }) => void;
  isFavorite?: boolean;
  searchQuery?: any;
};

const CitiesList: React.FC<Props> = React.memo(
  ({ flyToCity, isFavorite, searchQuery }) => {
    const { data: citiesResponse, isFetching } = useGetAllCitiesQuery();
    const { data: favoriteResponse, isFetching: isFavoriteFetching } =
      useGetFavoriteCitiesIdsQuery();
    const [createFavoriteCity] = useCreateFavoriteCityMutation();
    const [deleteFavoriteCity] = useDeleteFavoriteCityMutation();
    const favoriteIds = React.useMemo(() => {
      return favoriteResponse?.map(({ id }) => id) || [];
    }, [favoriteResponse]);

    const cities = React.useMemo(
      () =>
        citiesResponse?.map((city) => ({
          ...city,
          isFavorite: favoriteIds?.includes(city.id) || false,
        })),
      [citiesResponse, favoriteIds]
    );

    const favoriteCities = React.useMemo(
      () => cities?.filter((city) => city.isFavorite),
      [cities]
    );

    const getColor = React.useCallback((population: number) => {
      if (population > 250000) {
        return 'green';
      } else if (population > 20000) {
        return 'orange';
      } else {
        return 'pink';
      }
    }, []);

    const filteredCities = React.useMemo(() => {
      const trimmedQuery = searchQuery;
      if (isFavorite && trimmedQuery) {
        return favoriteCities?.filter(({ city }) =>
          city.toLowerCase().startsWith(trimmedQuery)
        );
      }

      if (!isFavorite && trimmedQuery) {
        return cities?.filter(({ city }) =>
          city.toLowerCase().startsWith(trimmedQuery)
        );
      }

      return isFavorite ? favoriteCities : cities;
    }, [cities, favoriteCities, isFavorite, searchQuery]);

    const loading = isFetching || isFavoriteFetching;
    return (
      <List
        size='large'
        itemLayout='horizontal'
        bordered={false}
        dataSource={cities?.filter(({ city }) =>
          city.toLowerCase().startsWith(searchQuery)
        )}
        loading={loading}
        renderItem={({ lat, lng, id, city, isFavorite, population }) => {
          const color = getColor(parseInt(population));

          return (
            <List.Item
              key={id}
              onClick={() => flyToCity({ lat, lng })}
              actions={[
                <Tooltip
                  key='favorites'
                  title={
                    isFavorite ? 'Remove from favorites' : 'Add to favorites'
                  }
                >
                  <Button
                    type='text'
                    icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
                    onClick={() => {
                      isFavorite
                        ? deleteFavoriteCity(id)
                        : createFavoriteCity(id);
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
        }}
      />
    );
  }
);

export default CitiesList;
