import { apiSlice } from "../../app/api";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => "/delivery/admin/admin",
    }),
  }),
});

export const { useGetAdminsQuery } = adminApiSlice;
