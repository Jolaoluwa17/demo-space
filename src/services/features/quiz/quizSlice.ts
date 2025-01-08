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
      query: ({ userId, quizId }) => ({
        url: `question/${quizId}`,
        method: 'GET',
        params: { userId, quizId },
      }),
    }),
    createQuiz: builder.mutation({
      query: (quizData) => ({
        url: 'quiz',
        method: 'POST',
        body: quizData,
      }),
    }),
    createQuizQuestion: builder.mutation({
      query: (questionData) => ({
        url: `question/${questionData.get('id')}`,
        method: 'POST',
        body: questionData,
      }),
    }),
    deleteQuiz: builder.mutation({
      query: (quizData) => ({
        url: `quiz/${quizData.id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllAssessmentsQuery,
  useGetQuizQuestionQuery,
  useCreateQuizMutation,
  useCreateQuizQuestionMutation,
  useDeleteQuizMutation,
} = quizSlice;
