import { apiSlice } from '@/services/apiSlice';

export const adminSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (adminData) => ({
        url: 'subAdmin',
        method: 'POST',
        body: adminData,
      }),
    }),
    getAdmin: builder.query({
      query: (id) => ({
        url: `subAdmin/${id}`,
        method: 'GET',
      }),
    }),
    getAllAdmin: builder.query({
      query: () => ({
        url: 'subAdmin',
        method: 'GET',
      }),
    }),
    deleteAdmin: builder.mutation({
      query: (adminData) => ({
        url: `subAdmin/${adminData.id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateAdminMutation,
  useGetAdminQuery,
  useGetAllAdminQuery,
  useDeleteAdminMutation,
} = adminSlice;
