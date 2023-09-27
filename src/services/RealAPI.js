import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../firebase/database";

export const RealAPI = createApi({
  reducerPath: "RealAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "Categories.json",
    }),

    getProducts: builder.query({
      query: () => "Products.json",
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsQuery } = RealAPI;