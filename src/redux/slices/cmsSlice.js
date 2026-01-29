import { apiSlice } from "./apiSlice";

export const cmsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    /* HERO */
    getHero: builder.query({
      query: () => "/cms/hero",
      providesTags: ["CMS"],
    }),

    /* ABOUT */
    getAbout: builder.query({
      query: () => "/cms/about",
      providesTags: ["CMS"],
    }),

    /* PRODUCTS */
    getProducts: builder.query({
      query: (params = {}) => ({
        url: "/products/getall",
        params,
      }),
      providesTags: ["PRODUCT"],
    }),

    getProduct: builder.query({
      query: (slug) => `/products/${slug}`,
      providesTags: ["PRODUCT"],
    }),

    getPopupPromo: builder.query({
      query: () => "/promos/popup",
      providesTags: ["PromoPopup"],
      keepUnusedDataFor: 60, // cache for 60s (optional but good)
    }),

  }),
});

export const {
  useGetHeroQuery,
  useGetAboutQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetPopupPromoQuery,
} = cmsApi;
