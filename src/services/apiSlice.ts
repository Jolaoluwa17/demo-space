import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { NavigateFunction } from 'react-router-dom';
import config from './config';

interface ExtraPoints {
  navigate?: NavigateFunction;
}

const baseQuery = fetchBaseQuery({
  baseUrl: config.hostedURL,
  credentials: 'include',
  prepareHeaders: () => {
    // const token = (getState() as RootState).auth.token;
    // if (token) {
    //   headers.set('Authorization', `Bearer ${token}`);
    // }
    // return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: ExtraPoints
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const navigate: NavigateFunction = api.extra as NavigateFunction;

    // Redirect to the login page
    navigate('/auth/login');
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
