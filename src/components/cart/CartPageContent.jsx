// src/components/cart/CartPageContent.jsx
"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";
import CartItemRow from "./CartItemRow";
import ProductGrid from "../home/ProductGrid";
import { useGetMeQuery } from "@/redux/slices/authApislice";
import LoginModal from "../login/LoginModal";

export default function CartPageContent() {
  const router = useRouter();
  const { cartItems, updateQty, removeFromCart, clearCart } = useCart();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { data: userData } = useGetMeQuery();

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );

  const discount = 0;
  const shipping = 50;
  const total = subtotal - discount + shipping;

  return (
    <>
      {/* Force light theme here */}
      <div className="min-h-screen bg-white text-gray-900">
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
            <p className="text-sm sm:text-base text-gray-900">
              Your cart is empty.
            </p>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
              {/* LEFT: items list */}
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
              </div>

              {/* RIGHT: order summary */}
              <aside className="w-full lg:w-[380px] bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 h-fit shrink-0">
                {/* Order summary */}
                <div className="">
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
                  </div>

                  <div className="mt-3 sm:mt-4 flex justify-between items-center text-sm border-t border-gray-100 pt-3 sm:pt-4">
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
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 min-w-0 px-3 py-2 text-xs sm:text-sm border rounded-full outline-none focus:ring-1 focus:ring-emerald-500 bg-white text-gray-900"
                      />
                      <button className="shrink-0 px-4 py-2 text-xs sm:text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition text-gray-900">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Buttons */}
                  <button
                    className="mt-4 sm:mt-5 w-full py-2.5 sm:py-3 rounded-full bg-[#1e5e3f] hover:bg-[#164a32] text-white text-sm font-medium transition"
                    onClick={() => {
                      if (userData?.user) {
                        router.push("/checkout");
                      } else {
                        setIsLoginModalOpen(true);
                      }
                    }}
                  >
                    Proceed to checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="mt-2 w-full py-2.5 sm:py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Clear cart
                  </button>

                  <p className="mt-4 text-[10px] sm:text-[11px] text-gray-400 leading-relaxed text-center">
                    By continuing, you agree to our Terms and Privacy Policy.
                  </p>
                </div>
              </aside>
            </div>
          )}

          {/* Recommendations BELOW the main content */}
          {cartItems.length > 0 && (
            <div className="mt-12 sm:mt-16 border-t border-gray-100 pt-10 sm:pt-12">
              <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900 px-4 sm:px-0">
                You may also like
              </h2>
              <ProductGrid />
            </div>
          )}
        </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        redirectPath="/checkout"
      />
    </>
  );
}
