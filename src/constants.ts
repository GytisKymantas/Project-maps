import * as L from 'leaflet';

export const DEFAULT_MAP_BOUNDS = L.latLngBounds(
  {
    lat: 44.0985,
    lng: 22.1522,
  },
  {
    lat: 52.3791,
    lng: 40.2288,
  },
);

export const MAP_TILE_LAYER = {
  maxZoom: 20,
  url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
  attribution:
    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
};
