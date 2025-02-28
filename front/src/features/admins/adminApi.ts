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
  }),
});

export const { useGetAdminsQuery, useAddNewAdminMutation } = adminApiSlice;
