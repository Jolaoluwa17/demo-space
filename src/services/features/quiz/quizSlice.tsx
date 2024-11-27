import { apiSlice } from '@/services/apiSlice';

export const quizSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssessments: builder.query({
      query: () => ({
        url: 'quiz',
        method: 'GET',
      }),
    }),
    getQuizQuestion: builder.query({
      query: (id) => ({
        url: `question/${id}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllAssessmentsQuery, useGetQuizQuestionQuery } = quizSlice;
