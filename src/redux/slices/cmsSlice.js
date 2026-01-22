import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cmsApi = createApi({
  reducerPath: "cmsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API,
  }),
  endpoints: (builder) => ({

    /* -------------------------
       HERO SECTION
    ------------------------- */
    getHero: builder.query({
      query: () => "/cms/hero",
    }),

    /* -------------------------
       ABOUT US
    ------------------------- */
    getAbout: builder.query({
      query: () => "/cms/about",
    }),

    /* -------------------------
       PRODUCTS (PUBLIC)
    ------------------------- */
    getProducts: builder.query({
      query: (params = {}) => ({
        url: "/products/getall",
        params,
      }),
    }),

    getProduct: builder.query({
      query: (slug) => `/products/${slug}`,
    }),
  }),
});

export const {
  useGetHeroQuery,
  useGetAboutQuery,
  useGetProductsQuery,
  useGetProductQuery,
} = cmsApi;
