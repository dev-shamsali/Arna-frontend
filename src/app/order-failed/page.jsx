"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function OrderFailedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-3">
          ❌ Payment Failed
        </h1>

        <p className="text-gray-600 mb-4">
          Your payment could not be completed.
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 mb-6">
            Order ID: {orderId}
          </p>
        )}

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push(`/retry-payment?orderId=${orderId}`)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700"
          >
            Retry Payment
          </button>

          <button
            onClick={() => router.push("/cart")}
            className="px-4 py-2 border border-gray-300 rounded-full"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
    