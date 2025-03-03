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
    unAssignAdminPower: builder.mutation({
      query: ({ admin_id, company_id }) => ({
        url: "/delivery/admin/admin/unassign-company",
        method: "DELETE",
        body: { admin_id, company_id },
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
    changeAdmin: builder.mutation({
      query: ({ data, id }) => ({
        url: `/delivery/admin/admin/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useAddNewAdminMutation,
  useAssignAdminPowerMutation,
  useGetAdminByIdQuery,
  useDeleteAdminMutation,
  useChangeAdminMutation,
  useUnAssignAdminPowerMutation,
} = adminApiSlice;
