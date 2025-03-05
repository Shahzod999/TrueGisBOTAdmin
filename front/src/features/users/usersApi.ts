import { apiSlice } from "../../app/api";
import { getAssignedCompanyType } from "../company/types";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignedCompany: builder.query({
      query: () => ({
        url: "/delivery/admin/admin/assigned-companies",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    getCurrentAdminAssignedCompanys: builder.query<
      getAssignedCompanyType,
      string
    >({
      query: (id) => ({
        url: `/delivery/admin/admin/assigned-companies?admin_id=${id}`,
        method: "GET",
      }),
      providesTags: ["Admin"],
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useGetAssignedCompanyQuery,
  useGetCurrentAdminAssignedCompanysQuery,
} = userApiSlice;
