import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { NavigateFunction } from 'react-router-dom';
import config from './config';
import { RootState } from './store';
import { refreshTokenRequest } from './features/auth/refreshToken';

interface ExtraPoints {
  navigate?: NavigateFunction;
}

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseURL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: ExtraPoints
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Send a request to your server to refresh the tokens using the refresh token
    const refreshResult = await refreshTokenRequest();

    if (refreshResult && refreshResult.accessToken) {
      // Retry the original query with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      const navigate: NavigateFunction = api.extra as NavigateFunction;

      // Redirect to the login page
      navigate('/login');
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
