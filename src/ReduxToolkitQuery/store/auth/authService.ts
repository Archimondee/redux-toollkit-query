import {createApi} from '@reduxjs/toolkit/query/react';
import AxiosBaseQuery from '../../config/AxiosService';
import {AuthType} from '../../../utils/UserType';
import {AxiosError} from 'axios';

//auth/login
export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: AxiosBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),
  tagTypes: ['Auth'],
  endpoints: builder => ({
    postLogin: builder.mutation<AuthType, {username: string; password: string}>(
      {
        query: ({
          username,
          password,
        }: {
          username: string;
          password: string;
        }) => ({
          url: `auth/login`,
          method: 'POST',
          data: {username: username, password: password},
          //body: {username: username, password: password},
        }),
        transformErrorResponse: (response: AxiosError | any) => {
          return {
            ...response,
            status: response?.status,
            message: response?.message?.message,
          };
        },
        transformResponse: (response: any) => {
          return {
            ...response,
            data: {
              id: response?.id,
              username: response?.username,
              email: response?.email,
              firstName: response?.firstName,
              lastName: response?.lastName,
              gender: response?.gender,
              image: response?.image,
              token: response?.token,
              fullname: response?.firstName + ' ' + response?.lastName,
            },
          };
        },
      },
    ),
    getMe: builder.query<AuthType, {token: string}>({
      query: ({token}: {token: string}) => ({
        url: `auth/me`,
        method: 'get',
        headers: {Authorization: 'Bearer ' + token},
      }),
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      transformErrorResponse: (response: AxiosError | any) => {
        return {
          ...response,
          status: response?.status,
          message: response?.message?.message,
        };
      },
      transformResponse: (response: any) => {
        return {
          ...response.data,
          data: {
            id: response?.id,
            username: response?.username,
            email: response?.email,
            firstName: response?.firstName,
            lastName: response?.lastName,
            gender: response?.gender,
            image: response?.image,
            fullname: response?.firstName + ' ' + response?.lastName,
          },
        };
      },
      keepUnusedDataFor: 60,
    }),
  }),
});

export const {usePostLoginMutation, useGetMeQuery} = authApi;
export const {postLogin, getMe} = authApi.endpoints;
