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
    deleteCategory: builder.mutation({
      query: ({ category_id }) => ({
        url: `/delivery/admin/category/${category_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ category_id, data }) => ({
        url: `/delivery/admin/category/${category_id}`,
        method: "PUT",
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
    getSingleProduct: builder.query({
      query: (productId) => `/delivery/admin/product/${productId}`,
      providesTags: ["Products"],
    }),
    addNewProducts: builder.mutation({
      query: ({ data }) => ({
        url: "/delivery/admin/product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: ({ productId }) => ({
        url: `/delivery/admin/product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `/delivery/admin/product/${productId}`,
        method: "PUT",
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
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productsApi;
