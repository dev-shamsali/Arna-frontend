"use client";

import { Package, ChevronDown, ChevronUp, MapPin, Truck, CheckCircle, Clock, Box, XCircle, ShoppingBag, ArrowRight, Eye, CreditCard, X, Receipt } from "lucide-react";
import { useState } from "react";
import { useGetMyOrdersQuery } from "@/redux/slices/orderApiSlice";
import { useRouter } from "next/navigation";


// Map shipment status to tracking steps
const TRACKING_STEPS = [
  { key: "Order Placed", icon: ShoppingBag, label: "Order Placed", description: "Your order has been received" },
  { key: "Processing", icon: Box, label: "Processing", description: "We're preparing your items" },
  { key: "Shipped", icon: Truck, label: "Shipped", description: "Your order is on its way" },
  { key: "Out for Delivery", icon: MapPin, label: "Out for Delivery", description: "Almost there!" },
  { key: "Delivered", icon: CheckCircle, label: "Delivered", description: "Order delivered successfully" },
];

const mapShipmentStatus = (status) => {
  const mapping = {
    created: "Order Placed",
    booked: "Processing",
    in_transit: "Shipped",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    failed: "Cancelled",
  };
  return mapping[status] || "Order Placed";
};

const STATUS_COLORS = {
  "Order Placed": { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500", border: "border-blue-200" },
  "Processing": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", border: "border-amber-200" },
  "Shipped": { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500", border: "border-purple-200" },
  "Out for Delivery": { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500", border: "border-orange-200" },
  "Delivered": { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", border: "border-emerald-200" },
  "Cancelled": { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500", border: "border-red-200" },
};

const PAYMENT_METHOD_LABELS = {
  cashfree: "Online Payment",
  cod: "Cash on Delivery",
  razorpay: "Razorpay",
  upi: "UPI",
};

const PAYMENT_STATUS_COLORS = {
  paid: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  failed: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};

function TrackingTimeline({ status }) {
  const currentStep = TRACKING_STEPS.findIndex((step) => step.key === status);
  const isCancelled = status === "Cancelled";

  if (isCancelled) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-red-500">Cancelled</p>
          <p className="text-xs text-gray-500 mt-0.5">This order has been cancelled.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-start gap-0">
        {TRACKING_STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          const isCompleted = idx <= currentStep;
          const isCurrent = idx === currentStep;
          const isLast = idx === TRACKING_STEPS.length - 1;

          return (
            <div key={step.key} className="flex-1 flex flex-col items-center relative">
              {!isLast && (
                <div className="absolute top-4 left-1/2 w-full h-0.5 z-0">
                  <div className="w-full h-full bg-gray-100 relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--arna-accent)] to-emerald-400 transition-all duration-700"
                      style={{ width: isCompleted && !isCurrent ? "100%" : isCurrent ? "50%" : "0%" }}
                    />
                  </div>
                </div>
              )}
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  isCompleted
                    ? "bg-[var(--arna-accent)] border-[var(--arna-accent)] shadow-md shadow-emerald-200"
                    : "bg-white border-gray-200"
                } ${isCurrent ? "ring-4 ring-[var(--arna-accent)]/20" : ""}`}
              >
                <StepIcon
                  className={`w-3.5 h-3.5 transition-colors duration-300 ${
                    isCompleted ? "text-white" : "text-gray-300"
                  }`}
                />
              </div>
              <div className="mt-2 text-center px-1">
                <p
                  className={`text-[10px] leading-tight font-semibold tracking-wide transition-colors duration-300 ${
                    isCompleted ? "text-[var(--arna-accent)]" : "text-gray-300"
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`text-[9px] leading-tight mt-0.5 hidden sm:block transition-colors duration-300 ${
                    isCompleted ? "text-gray-500" : "text-gray-300"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrderDetailsPanel({ order, onClose }) {
  const paymentStyle = PAYMENT_STATUS_COLORS[order.paymentStatus] || PAYMENT_STATUS_COLORS["pending"];
  const shippingCost = order.totalAmount - order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div className="fixed inset-x-0 bottom-0 sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[420px] z-50 flex flex-col bg-white shadow-2xl rounded-t-2xl sm:rounded-none sm:rounded-l-2xl max-h-[90vh] sm:max-h-screen animate-slide-up sm:animate-slide-left overflow-hidden">
        
        {/* Panel Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--arna-accent)]/10 flex items-center justify-center">
              <Receipt className="w-4 h-4 text-[var(--arna-accent)]" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Order Details</p>
              <p className="text-xs text-gray-400">#{order.orderId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          
          {/* Items Section */}
          <div className="px-5 py-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Items Ordered
            </p>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image}`}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>`;
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-[10px] text-gray-400">
                        ₹{item.price} each
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="mx-5 border-t border-dashed border-gray-200" />

          {/* Price Breakdown */}
          <div className="px-5 py-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Price Breakdown
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="text-sm font-medium text-gray-800">
                  ₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString("en-IN")}
                </span>
              </div>
              {shippingCost > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Shipping</span>
                  <span className="text-sm font-medium text-gray-800">
                    ₹{shippingCost.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-sm font-bold text-gray-900">Total</span>
                <span className="text-base font-bold text-[var(--arna-accent)]">
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-5 border-t border-dashed border-gray-200" />

          {/* Payment Info */}
          <div className="px-5 py-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Payment Info
            </p>
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {PAYMENT_METHOD_LABELS[order.paymentMethod] || order.paymentMethod}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">{order.paymentMethod}</p>
                </div>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full border capitalize ${paymentStyle.bg} ${paymentStyle.text} ${paymentStyle.border}`}
              >
                {order.paymentStatus}
              </span>
            </div>
          </div>

          {/* Order Meta */}
          <div className="px-5 pb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Order Info
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Order ID</p>
                <p className="text-xs font-bold text-gray-800 mt-0.5 truncate">{order.orderId}</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Date</p>
                <p className="text-xs font-bold text-gray-800 mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Order Status</p>
                <p className="text-xs font-bold text-gray-800 mt-0.5 capitalize">{order.orderStatus}</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Items</p>
                <p className="text-xs font-bold text-gray-800 mt-0.5">
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)} item(s)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.32, 0.72, 0, 1);
        }
        @media (min-width: 640px) {
          .sm\\:animate-slide-left {
            animation: slide-left 0.3s cubic-bezier(0.32, 0.72, 0, 1);
          }
        }
      `}</style>
    </>
  );
}

function OrderCard({ order }) {
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const displayStatus = mapShipmentStatus(order.shipmentStatus);
  const statusStyle = STATUS_COLORS[displayStatus] || STATUS_COLORS["Order Placed"];
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const totalItems = order.items?.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <>
      <div className="group rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Card Header */}
        <div className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left: Order info */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--arna-accent)]/10 to-emerald-50 flex items-center justify-center flex-shrink-0 border border-[var(--arna-accent)]/10">
                <Package className="w-5 h-5 text-[var(--arna-accent)]" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-bold text-gray-900 tracking-tight">
                    #{order.orderId}
                  </p>
                  {totalItems > 0 && (
                    <span className="text-xs text-gray-400 font-medium">
                      · {totalItems} {totalItems === 1 ? "item" : "items"}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <p className="text-xs text-gray-400">{formattedDate}</p>
                </div>
                {order.totalAmount !== undefined && (
                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    ₹{order.totalAmount.toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Status + Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                {displayStatus}
              </span>

              {/* View Details Button */}
              <button
                onClick={() => setIsDetailsOpen(true)}
                className="inline-flex cursor-pointer items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 bg-white text-gray-700 border-gray-200 hover:border-[var(--arna-accent)] hover:text-[var(--arna-accent)]"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">View Details</span>
                <span className="xs:hidden">Details</span>
              </button>

              {/* Track Order Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTrackingOpen((v) => !v);
                }}
                className={`inline-flex cursor-pointer items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                  isTrackingOpen
                    ? "bg-[var(--arna-accent)] text-white border-[var(--arna-accent)] shadow-md shadow-emerald-200"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[var(--arna-accent)] hover:text-[var(--arna-accent)]"
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Track Order</span>
                <span className="xs:hidden">Track</span>
                {isTrackingOpen ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tracking Dropdown */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isTrackingOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-50 bg-gradient-to-b from-gray-50/80 to-white px-5 sm:px-8 py-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-4 rounded-full bg-[var(--arna-accent)]" />
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Shipment Tracking
              </p>
            </div>
            <TrackingTimeline status={displayStatus} />
          </div>
        </div>

        {/* Bottom accent line on hover */}
        <div className="h-0.5 bg-gradient-to-r from-[var(--arna-accent)] to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      {/* Order Details Panel */}
      {isDetailsOpen && (
        <OrderDetailsPanel order={order} onClose={() => setIsDetailsOpen(false)} />
      )}
    </>
  );
}

export default function OrdersSection() {
  const router = useRouter();
  const { data, isLoading } = useGetMyOrdersQuery();
  const orders = data?.orders || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-7 w-36 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-4 w-56 bg-gray-100 rounded mt-2 animate-pulse" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="h-7 w-24 bg-gray-100 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-900">Your Orders</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {orders.length > 0
              ? `${orders.length} order${orders.length !== 1 ? "s" : ""} placed`
              : "View and track your recent purchases"}
          </p>
        </div>
        {orders.length > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--arna-accent)]/8 border border-[var(--arna-accent)]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--arna-accent)] animate-pulse" />
            <span className="text-xs font-semibold text-[var(--arna-accent)]">Live Tracking</span>
          </div>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 p-12 text-center bg-gradient-to-b from-gray-50 to-white">
          <div className="relative mb-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-100 flex items-center justify-center shadow-inner">
              <Package className="h-7 w-7 text-gray-300" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center">
              <span className="text-[10px]">0</span>
            </div>
          </div>
          <p className="text-base font-bold text-gray-900 mb-1">No orders yet</p>
          <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
            You haven't placed any orders yet. Discover our collection and find something you'll love.
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--arna-accent)] hover:bg-[#08633d] text-white rounded-xl transition-all duration-200 text-sm font-semibold shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/25 hover:-translate-y-0.5"
          >
            <ShoppingBag className="w-4 h-4" />
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}