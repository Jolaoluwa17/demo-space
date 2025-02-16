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
    getAllResults: builder.query({
      query: () => ({
        url: '/result',
        method: 'GET',
      }),
    }),
    getResultByUserId: builder.query({
      query: (id) => ({
        url: `/result/${id}`,
        method: 'GET',
      }),
    }),
    getResultByUserIdAndQuizId: builder.query({
      query: ({ userId, quizId }) => ({
        url: `result/userresult/${userId}`,
        method: 'GET',
        params: { userId, quizId },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateResultMutation,
  useGetAllResultsQuery,
  useGetResultByUserIdQuery,
  useGetResultByUserIdAndQuizIdQuery,
} = resultSlice;
