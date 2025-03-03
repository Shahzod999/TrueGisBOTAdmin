import { apiSlice } from "../../app/api";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: ({ company_id }) => ({
        url: "/delivery/admin/category",
        params: {
          company_id,
        },
      }),
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
    getAllProducts: builder.query({
      query: ({ page, limit = 15, company_id, category_id }) => ({
        url: "/delivery/admin/product",
        params: {
          page,
          limit,
          company_id,
          category_id,
        },
      }),
      providesTags: ["Products", "Category"],
    }),
    addNewProducts: builder.mutation({
      query: ({ data }) => ({
        url: "/delivery/admin/product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useAddNewCategoryMutation,
  useGetOneCategoryQuery,
  useGetAllProductsQuery,
  useAddNewProductsMutation,
} = productsApi;
