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
        url: loginData.userType === 'User' ? 'user/login' : 'subAdmin/login',
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
    resetPassword: builder.mutation({
      query: (userData) => ({
        url: `user/resetpassword/${userData.token}`,
        method: 'PATCH',
        body: userData,
      }),
    }),
    googleAuth: builder.query({
      query: () => ({
        url: 'user/auth/google',
        method: 'GET',
      }),
    }),
    changepassword: builder.mutation({
      query: (userData) => ({
        url: `user/changepassword/${userData.id}`,
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
  useResetPasswordMutation,
  useGoogleAuthQuery,
  useChangepasswordMutation,
} = authApiSlice;
