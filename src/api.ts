// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { City } from './types';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ['cities'],
  endpoints: (builder) => ({
    getAllCities: builder.query<City[], void>({
      query: () => `cities`,
    }),

    getFavoriteCitiesIds: builder.query<{ id: number }[], void>({
      query: () => `favorite-cities-ids`,
      providesTags: ['cities'],
    }),

    createFavoriteCity: builder.mutation<{ id: number }[], number>({
      query: (id) => ({
        url: `favorite-cities-ids`,
        method: 'POST',
        body: { id }
      }),
      invalidatesTags: ['cities'],
    }),

    deleteFavoriteCity: builder.mutation<{ id: number }[], number>({
      query: (id) => ({
        url: `favorite-cities-ids/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['cities'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllCitiesQuery, useGetFavoriteCitiesIdsQuery, useCreateFavoriteCityMutation, useDeleteFavoriteCityMutation } = api;
