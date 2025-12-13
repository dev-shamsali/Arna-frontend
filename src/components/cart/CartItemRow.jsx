// src/components/cart/CartItemRow.jsx
"use client";
import React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";

function CartItemRow({ item, onUpdateQty, onRemove }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 sm:px-4 lg:px-6 py-3 sm:py-4 gap-3 sm:gap-0">
      {/* LEFT: image + text */}
      <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
        <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-lg bg-[#F4F4F4] overflow-hidden flex-shrink-0">
          <Image 
            src={item.image} 
            alt={item.name} 
            fill 
            className="object-cover" 
            sizes="(max-width: 640px) 56px, 64px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-xs sm:text-sm lg:text-base line-clamp-2">
            {item.name}
          </p>
          {item.benefit && (
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
              {item.benefit}
            </p>
          )}
          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
            ₹{item.price} each
          </p>
        </div>
      </div>

      {/* RIGHT: qty controls + price + delete */}
      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
        {/* Quantity controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => onUpdateQty(item.id, item.qty - 1)}
            className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center border border-gray-300 rounded-full text-sm hover:bg-gray-50 active:bg-gray-100 transition"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="min-w-[1.5rem] sm:min-w-[2rem] text-center text-xs sm:text-sm font-medium">
            {item.qty}
          </span>
          <button
            onClick={() => onUpdateQty(item.id, item.qty + 1)}
            className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center border border-gray-300 rounded-full text-sm hover:bg-gray-50 active:bg-gray-100 transition"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Price */}
        <span className="w-16 sm:w-20 lg:w-24 text-right text-xs sm:text-sm font-semibold">
          ₹{(item.price * item.qty).toFixed(2)}
        </span>

        {/* Delete button */}
        <button
          onClick={() => onRemove(item.id)}
          className="ml-1 sm:ml-2 p-1 text-gray-400 hover:text-red-500 active:text-red-600 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
}

export default React.memo(CartItemRow);
