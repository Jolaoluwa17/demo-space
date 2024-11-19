import { apiSlice } from '../../apiSlice';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: 'GET',
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: `user/`,
        method: 'GET',
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (userData) => {
        const userId = userData.get('id'); // Access the 'id' from FormData
        return {
          url: `user/userprofile/${userId}`,
          method: 'PUT',
          body: userData,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUserQuery,
  useGetAllUserQuery,
  useUpdateUserProfileMutation,
} = userSlice;
