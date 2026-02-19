import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // 🛒 Create Order
        createOrder: builder.mutation({
            query: (data) => ({
                url: "/orders/create",
                method: "POST",
                body: data,
            }),
        }),

        // 🔁 Retry Payment
        retryPayment: builder.mutation({
            query: (orderId) => ({
                url: `/orders/${orderId}/retry`,
                method: "POST",
            }),
        }),

        // 💸 Refund Order
        refundOrder: builder.mutation({
            query: (orderId) => ({
                url: `/orders/${orderId}/refund`,
                method: "POST",
            }),
        }),

        getOrderById: builder.query({
            query: (orderId) => `/orders/${orderId}/get`,
        }),


    }),
});

export const {
    useCreateOrderMutation,
    useGetOrderByIdQuery,
    useRetryPaymentMutation,
    useRefundOrderMutation,
} = orderApiSlice;
