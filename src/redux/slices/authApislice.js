import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),

    googleLogin: builder.mutation({
      query: (data) => ({
        url: "/user/google",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),

    getMe: builder.query({
      query: () => "/user/me",
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApiSlice;
