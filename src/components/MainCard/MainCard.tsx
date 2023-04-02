import { Input, Row, Space } from 'antd';
import { Map } from 'leaflet';
import React, { useRef, useState } from 'react';
import CitiesList from '../CitiesList/CitiesList';
import MapsCard from '../MapsCard/MapsCard';
import * as S from './MainCard.styled';
import SwitchToggle from './SwitchToggle';

type Props = {};

const MainCard: React.FC<Props> = () => {
  const [isFavorites, setIsFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef<Map>(null);
  const flyToCity = ({ lat, lng }: { lat: string; lng: string }) => {
    mapRef.current?.flyTo([Number(lat), Number(lng)], 12);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setSearchQuery(() => e.target.value.toLowerCase().trim());
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
          <SwitchToggle setIsFavorites={setIsFavorites} />
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
