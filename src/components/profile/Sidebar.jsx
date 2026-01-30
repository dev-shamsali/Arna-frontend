"use client";

import clsx from "clsx";

const MENU_ITEMS = [
  { key: "orders", label: "Orders" },
  { key: "profile", label: "Profile" },
  { key: "addresses", label: "Addresses" },
  { key: "payment", label: "Payment Methods" },
  { key: "help", label: "Help & Support" },
  { key: "general", label: "General" },
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="w-full md:w-64">
      <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        <nav className="flex gap-2 overflow-x-auto md:flex-col md:gap-1">
          {MENU_ITEMS.map((item) => {
            const isActive = active === item.key;

            return (
              <button
                key={item.key}
                onClick={() => onChange(item.key)}
                className={clsx(
                  "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  "whitespace-nowrap md:whitespace-normal",
                  isActive
                    ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                {/* Active indicator */}
                <span
                  className={clsx(
                    "absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full transition",
                    isActive ? "bg-green-600" : "bg-transparent"
                  )}
                />

                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
