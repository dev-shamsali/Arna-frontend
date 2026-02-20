"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderFailedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-60" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div
        className="relative z-10 w-full max-w-md"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100/80 border border-gray-100 overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" />

          <div className="px-8 py-10 sm:px-10 sm:py-12 flex flex-col items-center text-center">
            {/* Icon */}
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-full border-2 border-red-200 animate-ping opacity-30" />
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              Payment Failed
            </h1>

            {/* Subtext */}
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
              We couldn't process your payment. Please try again or go back to your cart to make changes.
            </p>

            {/* Order ID badge */}
            {orderId && (
              <div className="mb-8 w-full">
                <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Order ID
                  </span>
                  <span className="text-sm font-mono font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg px-3 py-1 shadow-sm">
                    {orderId}
                  </span>
                </div>
              </div>
            )}

            {/* Info note */}
            <div className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 mb-8 flex gap-3 items-start text-left">
              <svg
                className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xs text-emerald-700 leading-relaxed">
                No charges have been made to your account. Your cart items are still saved.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={() => router.push(`/retry-payment?orderId=${orderId}`)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-semibold rounded-2xl transition-all duration-200 shadow-md shadow-emerald-100 hover:shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Retry Payment
              </button>

              <button
                onClick={() => router.push("/cart")}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 text-sm font-semibold rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Back to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Need help?{" "}
          <span className="text-emerald-600 font-medium cursor-pointer hover:underline">
            Contact support
          </span>
        </p>
      </div>
    </div>
  );
}