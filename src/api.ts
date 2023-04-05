// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { City } from './types';

export const api = createApi({ // <--- createApi is a function provided by RTK Query that creates a new API object. This function takes an object with several properties that define the API, including reducerPath, baseQuery, tagTypes, and endpoints.
  reducerPath: 'api', //  <--- reducerPath: A string that defines the slice name in the Redux store, that will ebe used to store the API data.
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }), // <--- An object that defines the base URL and other configuration options for the API.
  tagTypes: ['cities'], //  <--- is an array of strings that defines the types of tags that can be used to group related API responses.
  endpoints: (builder) => ({   // <--- An object that defines one or more endpoints for the API. Each endpoint is defined using a function that takes a builder object as its argument
    getAllCities: builder.query<City[], void>({ // <--- is a method that defines a read-only API request.
      query: () => `cities`,      //  <--- function that returns an object representing the API request, including the URL, HTTP method, and any request body.

    }),
    getFavoriteCitiesIds: builder.query<{ id: number }[], void>({
      query: () => `favorite-cities-ids`,
      providesTags: ['cities'], // <--- indicates that this endpoint provides data that can be used to invalidate other tags
    }),

    createFavoriteCity: builder.mutation<{ id: number }[], number>({ // <--- is a method that defines a read-write API request. 
      query: (id) => ({
        url: `favorite-cities-ids`,
        method: 'POST',
        body: { id }
      }),
      invalidatesTags: ['cities'], // <--- indicates that this endpoint invalidates other tags when it is called.
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
