import { apiSlice } from '@/services/apiSlice';

export const skillGapSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPrograms: builder.query({
      query: () => ({
        url: 'internshiprole',
        method: 'GET',
      }),
    }),
    getSpecificProgram: builder.query({
      query: (id) => ({
        url: `internshiprole/${id}`,
        method: 'GET',
      }),
    }),
    createProgram: builder.mutation({
      query: (programData) => ({
        url: `internshiprole`,
        method: 'POST',
        body: programData,
      }),
    }),
    deleteProgram: builder.mutation({
      query: (programData) => ({
        url: `internshiprole/${programData.id}`,
        method: 'DELETE',
      }),
    }),
    updateProgram: builder.mutation({
      query: (programData) => ({
        url: `internshiprole/${programData.id}`,
        method: 'PUT',
        body: programData,
      }),
    }),
    applyForInternship: builder.mutation({
      query: (programData) => ({
        url: `appliedintership/${programData.userId}`,
        method: 'POST',
        body: programData,
      }),
    }),
    getAllInternship: builder.query({
      query: () => ({
        url: 'appliedintership',
        method: 'GET',
      }),
    }),
    acceptSkillGap: builder.mutation({
      query: (internshipData) => ({
        url: `/appliedintership/${internshipData.id}`,
        method: 'PUT',
      }),
    }),
    declineSkillGap: builder.mutation({
      query: (internshipData) => ({
        url: `/appliedintership/decline/${internshipData.id}`,
        method: 'PUT',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllProgramsQuery,
  useGetSpecificProgramQuery,
  useCreateProgramMutation,
  useDeleteProgramMutation,
  useUpdateProgramMutation,
  useApplyForInternshipMutation,
  useGetAllInternshipQuery,
  useAcceptSkillGapMutation,
  useDeclineSkillGapMutation,
} = skillGapSlice;
