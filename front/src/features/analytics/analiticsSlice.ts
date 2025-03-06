import { apiSlice } from "../../app/api";
import { AnalyticsTypes } from "./types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query<AnalyticsTypes, void>({
      query: () => "/delivery/admin/dashboard/analytic",
      providesTags: ["Analytics"],
    }),
  }),
});

export const { useGetAnalyticsQuery } = authApiSlice;
