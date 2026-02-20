"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRetryPaymentMutation } from "@/redux/slices/orderApiSlice";
import Script from "next/script";

export default function RetryPaymentPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [retryPayment] = useRetryPaymentMutation();
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const hasRetried = useRef(false); // prevent double call in dev

  useEffect(() => {
    if (!orderId || !sdkLoaded || hasRetried.current) return;

    hasRetried.current = true;

    const retry = async () => {
      try {
        const data = await retryPayment(orderId).unwrap();

        if (!window.Cashfree) {
          console.error("Cashfree SDK not available");
          return;
        }

        const cashfree = new window.Cashfree({
          mode: "sandbox",
        });

        cashfree.checkout({
          paymentSessionId: data.paymentSessionId,
          redirectTarget: "_self",
        });

      } catch (err) {
        console.error("Retry error:", err);
      }
    };

    retry();
  }, [orderId, sdkLoaded, retryPayment]);

  return (
    <>
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        strategy="afterInteractive"
        onLoad={() => setSdkLoaded(true)}
      />

      <p>Redirecting to payment...</p>
    </>
  );
}