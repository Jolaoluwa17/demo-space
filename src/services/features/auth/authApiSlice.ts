import { apiSlice } from '../../apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userData) => ({
        url: 'api/user/',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: 'api/user/login',
        method: 'POST',
        body: loginData,
      }),
    }),
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `api/user/${id}`,
        method: 'DELETE',
      }),
    }),
    updateUserInfo: builder.mutation({
      query: (userData) => ({
        url: `api/user/${userData.id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useDeleteAccountMutation,
  useUpdateUserInfoMutation,
} = authApiSlice;
