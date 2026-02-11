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
      invalidatesTags: ["User"],
    }),

    getMe: builder.query({
      query: () => "/user/me",
      providesTags: ["User"],
    }),

    updateMe: builder.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PUT",
        body: data, // RTK handles JSON.stringify
      }),
      invalidatesTags: ["User"],
    }),

    deleteAccount: builder.mutation({
      query: () => ({
        url: "/user/delete-account",
        method: "DELETE",
      }),
    }),
    addAddress: builder.mutation({
      query: (data) => ({
        url: "/user/address",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"], // refresh getMe
    }),

    updateAddress: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/user/address/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/user/address/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),



  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useDeleteAccountMutation,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = authApiSlice;
