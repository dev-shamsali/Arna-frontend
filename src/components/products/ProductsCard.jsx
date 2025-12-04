"use client";
import Image from "next/image";
import { ShoppingCart, Star, Sparkles } from "lucide-react";

export default function ProductCard({ product }) {
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-[#0A7A4E]/10 transition-all duration-500 hover:-translate-y-2">

      <div className="relative bg-[#F4F4F4] aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
          className="object-cover"
          quality={85}
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 flex items-center gap-1 bg-gradient-to-r from-[#C9A86A] to-[#C9A86A]/90 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
            {product.badge === "Bestseller"
              ? <Star className="w-3 h-3" />
              : <Sparkles className="w-3 h-3" />}
            {product.badge}
          </div>
        )}
      </div>

      <div className="p-5 md:p-6 flex flex-col h-full">
        <h3 className="font-serif text-xl md:text-2xl text-gray-800 mb-2 group-hover:text-[#0A7A4E] transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {product.benefit}
        </p>

        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-2xl font-bold text-[#0A7A4E]">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
          <span className="text-xs font-semibold text-[#C9A86A] bg-[#C9A86A]/10 px-2 py-1 rounded">
            {discount}% OFF
          </span>
        </div>

        <button className="w-full bg-[#0A7A4E] hover:bg-[#0A7A4E]/90 text-white py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-[#0A7A4E]/30">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
