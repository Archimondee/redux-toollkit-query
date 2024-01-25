import {createApi} from '@reduxjs/toolkit/query/react';
import {RequestUserType, UserDetailType} from '../../../utils/UserType';
import AxiosBaseQuery from '../../config/AxiosService';

export const userApi = createApi({
  reducerPath: 'users',
  baseQuery: AxiosBaseQuery({
    baseUrl: 'https://reqres.in/api/',
  }),
  tagTypes: ['Users'],
  endpoints: builder => ({
    getUsers: builder.query<RequestUserType, {page: number}>({
      query: ({page}: {page: number}) => ({
        url: `users?page=${page}&delay=2`,
        method: 'get',
      }),
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        return {
          ...currentCache,
          data: [...currentCache.data, ...newItems.data],
        };
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
      transformResponse: (response: RequestUserType) => {
        return {
          ...response,
          data: response.data.map(item => ({
            ...item,
            //Transform Response
            name: item.first_name + ' ' + item.last_name,
          })),
        };
      },
    }),
    getUser: builder.query<UserDetailType, {id: number}>({
      query: ({id}: {id: number}) => ({
        url: `users/${id}`,
        method: 'get',
      }),
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      transformResponse: (response: UserDetailType) => {
        return {
          ...response,
          data: {
            ...response.data,
            name: response.data.first_name + ' ' + response.data.last_name,
          },
        };
      },
    }),
  }),
});

export const {useGetUsersQuery, useGetUserQuery} = userApi;
export const {getUsers, getUser} = userApi.endpoints;
