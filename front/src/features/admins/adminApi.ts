import { apiSlice } from "../../app/api";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => "/delivery/admin/admin",
      providesTags: ["Admin"],
    }),

    addNewAdmin: builder.mutation({
      query: (data) => ({
        url: "/delivery/admin/admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),

    assignAdminPower: builder.mutation({
      query: (data) => ({
        url: "/delivery/admin/admin/assign-company",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),

    getAdminById: builder.query({
      query: (id) => `/delivery/admin/admin/${id}`,
      providesTags: ["Admin"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/delivery/admin/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
    changeAdminPassword: builder.mutation({
      query: ({ data, id }) => ({
        url: `/delivery/admin/admin/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useAddNewAdminMutation,
  useAssignAdminPowerMutation,
  useGetAdminByIdQuery,
  useDeleteAdminMutation,
  useChangeAdminPasswordMutation,
} = adminApiSlice;
