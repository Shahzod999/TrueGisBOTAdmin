import { apiSlice } from "../../app/api";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignedCompany: builder.query({
      query: () => ({
        url: "/delivery/admin/admin/assigned-companies",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAssignedCompanyQuery } = userApiSlice;
