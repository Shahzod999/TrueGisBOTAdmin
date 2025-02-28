import { apiSlice } from "../../app/api";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "/delivery/admin/category",
      providesTags: ["Category"],
    }),

    addNewCategory: builder.mutation({
      query: (data) => ({
        url: "/delivery/admin/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    getOneCategory: builder.query({
      query: (categoryId) => `/delivery/admin/category/${categoryId}`,
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useAddNewCategoryMutation,
  useGetOneCategoryQuery,
} = productsApi;
