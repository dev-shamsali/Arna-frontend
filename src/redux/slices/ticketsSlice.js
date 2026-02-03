import { apiSlice } from "./apiSlice";

export const ticketsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE TICKET (Contact Form)
    createTicket: builder.mutation({
      query: (data) => ({
        url: "/tickets/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tickets"],
    }),
  }),
});

export const {
  useCreateTicketMutation,
} = ticketsApi;
