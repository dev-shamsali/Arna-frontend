import { Package } from "lucide-react";

export default function OrdersSection() {
  // later you can replace this with RTK Query or API call
  const orders = [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-serif font-bold text-gray-900">
          Your Orders
        </h2>
        <p className="text-sm text-gray-500">
          View and track your recent purchases
        </p>
      </div>

      {/* Orders list */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 border-dashed p-10 text-center bg-gray-50">
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <Package className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-lg font-medium text-gray-900 mb-2">
            No orders yet
          </p>
          <p className="text-sm text-gray-500">
            You haven't placed any orders yet.
          </p>
          <button className="mt-6 px-6 py-2.5 bg-[var(--arna-accent)] hover:bg-[#08633d] text-white rounded-lg transition-colors font-medium shadow-sm">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-gray-900">
                    Order #{order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Placed on {order.date}
                  </p>
                </div>

                <div className="flex items-center justify-end">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-[var(--arna-accent)]/10 text-[var(--arna-accent)]">
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
