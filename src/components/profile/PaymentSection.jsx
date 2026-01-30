"use client";

import { useState } from "react";

export default function PaymentSection() {
  const [savedCards, setSavedCards] = useState([]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Payment Methods
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage your saved payment methods
        </p>
      </div>

      {/* Saved Cards */}
      <div className="space-y-4">
        {savedCards.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <p className="mt-4 text-sm text-gray-600">
              No saved payment methods
            </p>
            <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              Add Payment Method
            </button>
          </div>
        ) : (
          savedCards.map((card) => (
            <div
              key={card.id}
              className="p-4 border border-gray-200 rounded-lg bg-white"
            >
              {/* Card details */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
