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
        const userId = userData.get('id')
        return {
          url: `user/userprofile/${userId}`,
          method: 'PUT',
          body: userData,
        };
      },
    }),
    deleteUser: builder.mutation({
      query: (userData) => ({
        url: `user/${userData.id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUserQuery,
  useGetAllUserQuery,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
} = userSlice;
