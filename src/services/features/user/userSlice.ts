import { apiSlice } from '../../apiSlice';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: 'GET',
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: `user/userprofile/${userData.id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserQuery, useUpdateUserProfileMutation } = userSlice;
