import { apiSlice } from '@/services/apiSlice';

export const resultSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createResult: builder.mutation({
      query: (resultData) => ({
        url: `/result/${resultData.userId}`,
        method: 'POST',
        body: resultData,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useCreateResultMutation } = resultSlice;
