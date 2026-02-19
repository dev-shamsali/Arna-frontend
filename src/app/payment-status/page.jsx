"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetOrderByIdQuery } from "@/redux/slices/orderApiSlice";
import { useCart } from "@/components/cart/CartContext";

export default function PaymentStatusPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { clearCart } = useCart();

    const orderId = searchParams.get("orderId");

    const { data: order, isLoading, refetch } =
        useGetOrderByIdQuery(orderId, {
            skip: !orderId,
        });

    useEffect(() => {
        if (!orderId) return;

        const interval = setInterval(() => {
            refetch();
        }, 3000); // poll every 3 seconds

        return () => clearInterval(interval);
    }, [orderId, refetch]);

    useEffect(() => {
        if (!order?.paymentStatus) return;

        if (order.paymentStatus === "paid") {
            clearCart();
            router.replace(`/order-success?orderId=${order.orderId}`);
        }

        if (order.paymentStatus === "failed") {
            router.replace(`/payment-failed?orderId=${order.orderId}`);
        }
    }, [order, router, clearCart]);
    useEffect(() => {
        console.log("ORDER FROM API:", order);
    }, [order]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-lg font-medium">
                Verifying your payment...
            </p>
        </div>
    );
}
