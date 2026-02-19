"use client";

import { useSearchParams } from "next/navigation";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-emerald-600 mb-3">
          🎉 Payment Successful!
        </h1>
        <p className="text-gray-600">
          Your order has been placed successfully.
        </p>
        {orderId && (
          <p className="mt-2 text-sm text-gray-500">
            Order ID: {orderId}
          </p>
        )}
      </div>
    </div>
  );
}
