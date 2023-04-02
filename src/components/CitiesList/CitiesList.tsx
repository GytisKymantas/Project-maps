import React from 'react';
import { List } from 'antd';
import { useGetAllCitiesQuery, useGetFavoriteCitiesIdsQuery } from '../../api';
import ListItem from './ListItem';

type Props = {
  flyToCity: (payload: { lat: string; lng: string }) => void;
  isFavoriteToggled?: boolean;
  searchQuery?: any;
};

const CitiesList: React.FC<Props> = React.memo(
  ({ flyToCity, isFavoriteToggled, searchQuery }) => {
    const { data: citiesResponse, isFetching } = useGetAllCitiesQuery();
    const { data: favoriteResponse, isFetching: isFavoriteFetching } =
      useGetFavoriteCitiesIdsQuery();
    console.log('rerendered cities list');
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
      if (isFavoriteToggled && trimmedQuery) {
        return favoriteCities?.filter(({ city }) =>
          city.toLowerCase().startsWith(trimmedQuery)
        );
      }

      if (!isFavoriteToggled && trimmedQuery) {
        return cities?.filter(({ city }) =>
          city.toLowerCase().startsWith(trimmedQuery)
        );
      }

      return isFavoriteToggled ? favoriteCities : cities;
    }, [cities, favoriteCities, isFavoriteToggled, searchQuery]);

    const loading = isFetching || isFavoriteFetching;
    return (
      <List
        size='large'
        itemLayout='horizontal'
        bordered={false}
        dataSource={filteredCities}
        loading={loading}
        renderItem={({ lat, lng, id, city, population, isFavorite }) => {
          const color = getColor(parseInt(population));
          return (
            <ListItem
              color={color}
              flyToCity={flyToCity}
              lat={lat}
              lng={lng}
              id={id}
              city={city}
              isFavorite={isFavorite}
            />
          );
        }}
      />
    );
  }
);

export default CitiesList;
