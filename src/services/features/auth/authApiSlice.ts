import { apiSlice } from '../../apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userData) => ({
        url: 'user',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: 'user/login',
        method: 'POST',
        body: loginData,
      }),
    }),
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: 'DELETE',
      }),
    }),
    updateUserInfo: builder.mutation({
      query: (userData) => ({
        url: `user/${userData.id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
    verifyAccount: builder.mutation({
      query: (userData) => ({
        url: 'user/verify',
        method: 'POST',
        body: userData,
      }),
    }),
    requestCode: builder.mutation({
      query: (userData) => ({
        url: 'user/requestcode',
        method: 'POST',
        body: userData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (userData) => ({
        url: 'user/forgotpassword',
        method: 'POST',
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
  useVerifyAccountMutation,
  useRequestCodeMutation,
  useForgotPasswordMutation,
} = authApiSlice;
