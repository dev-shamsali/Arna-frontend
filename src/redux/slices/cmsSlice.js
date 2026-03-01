import { apiSlice } from "./apiSlice";

export const cmsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* HOME HERO */
    getHomeHero: builder.query({
      query: () => "/cms/hero",
      providesTags: ["CMS"],
    }),
    saveHomeHero: builder.mutation({
      query: (formData) => ({
        url: "/cms/hero",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["CMS"],
    }),

    /* ABOUT US */
    getAboutUs: builder.query({
      query: () => "/about",
      providesTags: ["AboutUs"],
    }),
    saveAboutUs: builder.mutation({
      query: (formData) => ({
        url: "/about",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["AboutUs"],
    }),
    updateAboutUs: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/about/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["AboutUs"],
    }),
    deleteAboutUs: builder.mutation({
      query: (id) => ({
        url: `/about/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AboutUs"],
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
    getOurStory: builder.query({
      query: () => "/our-story/get",
      providesTags: ["OurStory"],
    }),
    getProductsHero: builder.query({
      query: () => "/producthero/products-hero",
    }),

  }),
});

export const {
  useGetHomeHeroQuery,
  useSaveHomeHeroMutation,
  useGetAboutUsQuery,
  useSaveAboutUsMutation,
  useUpdateAboutUsMutation,
  useDeleteAboutUsMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useGetPopupPromoQuery,
  useGetOurStoryQuery,
  useGetProductsHeroQuery,
} = cmsApi;