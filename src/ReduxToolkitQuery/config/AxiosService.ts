import type {BaseQueryFn} from '@reduxjs/toolkit/query';
import axios, {Axios, AxiosError, AxiosRequestConfig} from 'axios';

export type BaseQueryError = {status?: number; message?: any};
const AxiosBaseQuery = (
  {baseUrl}: {baseUrl: string} = {baseUrl: ''},
): BaseQueryFn<
  {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers'];
  },
  unknown,
  BaseQueryError
> => async ({url, method, data, params, headers}) => {
  try {
    const result = await axios({
      url: baseUrl + url,
      method,
      data,
      params,
      headers,
      timeout: 10000,
    });
    return {data: result.data};
  } catch (axiosError) {
    const err = axiosError as AxiosError;

    return {
      error: {
        status: err.response?.status,
        message: err.response?.data,
      },
    };
  }
};

export default AxiosBaseQuery;
