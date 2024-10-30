import { apiSlice } from '../apiSlice';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserQuery } = userSlice;
