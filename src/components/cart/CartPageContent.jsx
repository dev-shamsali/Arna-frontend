// src/components/cart/CartPageContent.jsx
"use client";
import { useMemo } from "react";
import { useCart } from "./CartContext";
import CartItemRow from "./CartItemRow";
import ProductGrid from "../home/ProductGrid";
import { useRouter } from "next/navigation";

export default function CartPageContent() {
  const router = useRouter();
  const { cartItems, updateQty, removeFromCart, clearCart } = useCart();

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );

  const discount = 0;
  const shipping = 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal - discount + shipping + tax;

  return (
    <>
      {/* CART SECTION - Force white background, override dark mode */}
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
              Your Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              {cartItems.length} item{cartItems.length !== 1 && "s"}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
            Review your items before proceeding to secure checkout.
          </p>

          {cartItems.length === 0 ? (
            <p className="text-sm sm:text-base text-gray-900">Your cart is empty.</p>
          ) : (
            <div className="grid gap-4 lg:gap-6 lg:grid-cols-[3fr,2fr]">
              {/* LEFT: items list */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center gap-3 text-xs sm:text-sm">
                  <button className="font-medium text-gray-900">Items</button>
                  <span className="hidden sm:inline text-gray-300">|</span>
                  <span className="hidden sm:inline text-gray-500">
                    Skincare
                  </span>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onUpdateQty={updateQty}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT: product grid + order summary */}
              <aside className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 h-fit space-y-4">
                {/* Product grid / recommendations */}
                <div>
                  <h2 className="text-base sm:text-lg font-semibold mb-2 text-gray-900">
                    You may also like
                  </h2>
                  <ProductGrid />
                </div>

                {/* Order summary */}
                <div className="border-t border-gray-100 pt-3 sm:pt-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-1 text-gray-900">
                    Order summary
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 mb-3 sm:mb-4">
                    No additional fees at this step.
                  </p>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">
                        ₹{subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-gray-500">
                        ₹{discount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-500">
                        {shipping === 0
                          ? "Calculated at checkout"
                          : `₹${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-500">
                        {tax === 0 ? "Included" : `₹${tax.toFixed(2)}`}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 flex justify-between items-center text-sm">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-base sm:text-lg font-semibold text-gray-900">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>

                  {/* Promo code */}
                  <div className="mt-4 sm:mt-5">
                    <p className="text-[11px] sm:text-xs text-gray-600 mb-1">
                      Promo or gift code
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 text-xs sm:text-sm border rounded-full outline-none focus:ring-1 focus:ring-emerald-500 bg-white text-gray-900"
                      />
                      <button className="px-4 py-2 text-xs sm:text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition text-gray-900">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Buttons */}
                  <button
                    className="mt-4 sm:mt-5 w-full py-2.5 sm:py-3 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
                    onClick={() => router.push("/checkout")}
                  >
                    Proceed to checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="mt-2 w-full py-2.5 sm:py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Clear cart
                  </button>

                  <p className="mt-3 text-[10px] sm:text-[11px] text-gray-400 leading-relaxed">
                    By continuing, you agree to our Terms and Privacy Policy.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
