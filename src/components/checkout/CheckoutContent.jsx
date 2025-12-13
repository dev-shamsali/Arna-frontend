// src/components/checkout/CheckoutContent.jsx
"use client";

import { useCart } from "@/components/cart/CartContext";
import { useMemo, useState } from "react";
import Image from "next/image";

export default function CheckoutContent() {
  const { cartItems } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [billingAddress, setBillingAddress] = useState("same");

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );
  const shipping = 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const handlePayNow = async () => {
    if (paymentMethod === "razorpay") {
      // TODO: call API to create Razorpay order & open checkout
    } else {
      // COD logic
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* Payment Section */}
      <section className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-1">Payment</h1>
        <p className="text-xs sm:text-sm text-gray-500 mb-4">
          All transactions are secure and encrypted.
        </p>

        {/* Razorpay Option */}
        <div
          className={`border rounded-xl p-4 mb-3 cursor-pointer transition ${
            paymentMethod === "razorpay"
              ? "border-sky-400 bg-sky-50"
              : "border-gray-200 bg-white"
          }`}
          onClick={() => setPaymentMethod("razorpay")}
        >
          <div className="flex items-center gap-3 mb-2">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "razorpay"}
              onChange={() => setPaymentMethod("razorpay")}
              className="w-4 h-4 accent-sky-500"
            />
            <span className="text-sm font-medium flex-1">
              Razorpay Secure (UPI, Cards, Int'l Cards, Wallets)
            </span>
            {/* Payment Icons */}
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-1 text-xs font-semibold text-gray-600 border border-gray-300 rounded px-1.5 py-0.5">
                UPI
              </div>
              <div className="text-xs font-semibold text-blue-700 border border-blue-300 rounded px-1.5 py-0.5">
                VISA
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <div className="w-4 h-4 rounded-full bg-orange-400 -ml-2"></div>
              </div>
              <span className="text-xs text-gray-500">+18</span>
            </div>
          </div>

          {paymentMethod === "razorpay" && (
            <div className="mt-3 pt-3 border-t border-gray-200 flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="2" />
                  <path d="M3 8h18" strokeWidth="2" />
                  <path d="M16 12h2" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-xs text-gray-600">
                After clicking "Pay now", you will be redirected to Razorpay
                Secure (UPI, Cards, Int'l Cards, Wallets) to complete your
                purchase securely.
              </p>
            </div>
          )}
        </div>

        {/* COD Option */}
        <div
          className={`border rounded-xl p-4 cursor-pointer transition ${
            paymentMethod === "cod"
              ? "border-sky-400 bg-sky-50"
              : "border-gray-200 bg-white"
          }`}
          onClick={() => setPaymentMethod("cod")}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
              className="w-4 h-4 accent-sky-500"
            />
            <span className="text-sm font-medium">Cash on Delivery (COD)</span>
          </div>
        </div>
      </section>

      {/* Billing Address */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Billing address</h2>

        <div
          className={`border rounded-xl p-4 mb-3 cursor-pointer transition ${
            billingAddress === "same"
              ? "border-sky-400 bg-sky-50"
              : "border-gray-200 bg-white"
          }`}
          onClick={() => setBillingAddress("same")}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="billing"
              checked={billingAddress === "same"}
              onChange={() => setBillingAddress("same")}
              className="w-4 h-4 accent-sky-500"
            />
            <span className="text-sm font-medium">Same as shipping address</span>
          </div>
        </div>

        <div
          className={`border rounded-xl p-4 cursor-pointer transition ${
            billingAddress === "different"
              ? "border-sky-400 bg-sky-50"
              : "border-gray-200 bg-white"
          }`}
          onClick={() => setBillingAddress("different")}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="billing"
              checked={billingAddress === "different"}
              onChange={() => setBillingAddress("different")}
              className="w-4 h-4 accent-sky-500"
            />
            <span className="text-sm font-medium">Use a different billing address</span>
          </div>
        </div>
      </section>

      {/* Order Summary */}
      {/* Order Summary */}
<section className="border rounded-xl p-4 sm:p-5 bg-white">
  <h2 className="text-lg sm:text-xl font-serif font-semibold mb-4 pb-3 border-b">
    Order summary
  </h2>

  {/* Cart Items - Simple vertical list with image */}
  <div className="space-y-4 mb-4">
    {cartItems.map((item) => (
      <div key={item.id} className="flex items-center gap-4">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm sm:text-base font-medium text-gray-900 leading-snug">
            {item.name}
          </p>
          <p className="text-xs text-gray-500 mt-1">Qty: {item.qty}</p>
        </div>
        <span className="text-sm font-semibold text-gray-900">
          ₹{(item.price * item.qty).toFixed(2)}
        </span>
      </div>
    ))}
  </div>

  {/* Pricing Details */}
  <div className="border-t pt-4 space-y-2 text-sm">
    <div className="flex justify-between">
      <span className="text-gray-600">Subtotal</span>
      <span className="font-medium">₹{subtotal.toFixed(2)}</span>
    </div>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-1">
        <span className="text-gray-600">Shipping</span>
        <svg
          className="w-3.5 h-3.5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <span className="text-gray-500 text-xs">
        {shipping === 0 ? "Enter shipping address" : `₹${shipping.toFixed(2)}`}
      </span>
    </div>
  </div>

  {/* Total */}
  <div className="border-t mt-4 pt-4 flex justify-between items-center">
    <span className="text-base font-semibold">Total</span>
    <div className="text-right">
      <div className="text-xs text-gray-500 mb-0.5">INR</div>
      <div className="text-xl font-bold">₹{total.toFixed(2)}</div>
    </div>
  </div>
  <p className="text-[10px] text-gray-400 mt-1">
    Including ₹{tax.toFixed(2)} in taxes
  </p>

  {/* Pay Now Button */}
  <button
    onClick={handlePayNow}
    className="mt-5 w-full rounded-full bg-sky-500 hover:bg-sky-600 text-white py-3 text-sm font-semibold transition shadow-sm"
  >
    Pay now
  </button>
</section>


      {/* Footer Links */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-sky-600">
        <a href="#" className="hover:underline">Refund policy</a>
        <a href="#" className="hover:underline">Shipping</a>
        <a href="#" className="hover:underline">Privacy policy</a>
        <a href="#" className="hover:underline">Terms of service</a>
      </div>
    </div>
  );
}
