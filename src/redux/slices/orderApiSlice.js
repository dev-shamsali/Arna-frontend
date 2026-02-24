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
        getMyOrders: builder.query({
            query: () => "/orders/my-orders",
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

        previewOrder: builder.mutation({
            query: (data) => ({
                url: "/orders/preview",
                method: "POST",
                body: data,
            }),
        }),


    }),
});

export const {
    useCreateOrderMutation,
    useGetOrderByIdQuery,
    useRetryPaymentMutation,
    useRefundOrderMutation,
    useGetMyOrdersQuery,
    usePreviewOrderMutation,
} = orderApiSlice;
