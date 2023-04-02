import { Input, Row, Space, Switch } from 'antd';
import { Map } from 'leaflet';
import React, { useRef, useState } from 'react';
import CitiesList from '../CitiesList/CitiesList';
import MapsCard from '../MapsCard/MapsCard';
import * as S from './MainCard.styled';

type Props = {};

const MainCard: React.FC<Props> = () => {
  const [isFavorites, setIsFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef<Map>(null);
  console.log(searchQuery, 'searchQuery');
  const flyToCity = ({ lat, lng }: { lat: string; lng: string }) => {
    mapRef.current?.flyTo([Number(lat), Number(lng)], 12);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      return setSearchQuery(() => e.target.value.toLowerCase().trim());
    }
    return setSearchQuery('');
  };

  return (
    <S.Main
      title={
        <Space size={30}>
          <Input.Search
            placeholder='Search...'
            onChange={(e) => handleSearch(e)}
            style={{ width: 200 }}
          />
          <Space align='center'>
            <Switch
              defaultChecked={false}
              onClick={() => setIsFavorites(!isFavorites)}
            />
            <span>Show only favorites</span>
          </Space>
        </Space>
      }
    >
      <Row>
        <S.StyledCol span={8}>
          <CitiesList
            isFavorite={isFavorites}
            searchQuery={searchQuery}
            flyToCity={flyToCity}
          />
        </S.StyledCol>
        <S.StyledCol span={16}>
          <MapsCard ref={mapRef} />
        </S.StyledCol>
      </Row>
    </S.Main>
  );
};

export default MainCard;
