import React from 'react';
import { DEFAULT_MAP_BOUNDS, MAP_TILE_LAYER } from '../../constants';
import { TileLayer } from 'react-leaflet';
import { Map } from 'leaflet';
import * as S from './MapsCard.styled';

type Props = {};

const MapsCard = React.forwardRef<Map>((props: Props, ref) => {
  return (
    <S.StyledMapContainer
      ref={ref}
      bounds={DEFAULT_MAP_BOUNDS}
      zoom={8}
      scrollWheelZoom={false}
    >
      <TileLayer {...MAP_TILE_LAYER} />
    </S.StyledMapContainer>
  );
});

export default React.memo(MapsCard);
