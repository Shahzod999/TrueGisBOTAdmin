import { apiSlice } from "../../app/api";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignedCompany: builder.query({
      query: () => ({
        url: "/delivery/admin/admin/assigned-companies",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    getCurrentAdminAssignedCompanys: builder.query({
      query: (id) => ({
        url: `/delivery/admin/admin/assigned-companies?admin_id=${id}`,
        method: "GET",
        keepUnusedDataFor: 300,
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetAssignedCompanyQuery,
  useGetCurrentAdminAssignedCompanysQuery,
} = userApiSlice;
