import { apiSlice } from "../../app/api";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ data }) => ({
        url: "/admin/auth/login/",
        method: "POST",
        body: data,
      }),
    }),
    switchCompany: builder.mutation({
      query: ({ company_id }) => ({
        url: "/admin/auth/switch-company",
        method: "POST",
        body: { company_id },
      }),
      invalidatesTags: ["Admin", "Analytics"],
    }),
  }),
});

export const { useLoginUserMutation, useSwitchCompanyMutation } = authApiSlice;
