// src/components/products/ProductCard.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Sparkles } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { useEffect } from "react";

export default function ProductCard({ product }) {
  const { addToCart, updateQty, cartItems } = useCart();

  // // Debug logging
  // useEffect(() => {
  //   console.log('ProductCard received:', {
  //     name: product.name,
  //     image: product.image,
  //     price: product.price,
  //     mrp: product.mrp,
  //     id: product.id,
  //     slug: product.slug
  //   });
  // }, [product]);

  const discount = product.mrp && product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;
    
  const existing = cartItems.find((p) => p.id === product.id);
  const qtyInCart = existing?.qty || 0;

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-[#0A7A4E]/10 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
      {/* IMAGE + BADGE = CLICK FOR MORE INFO */}
      <Link
        href={`/products/${product.slug}`}
        className="relative bg-[#F4F4F4] aspect-square overflow-hidden block"
      >
        <img
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          quality={85}
          loading="lazy"
          onError={(e) => {
            console.error('Image failed to load:', product.image);
            // Optionally set a fallback image
            // e.currentTarget.src = '/placeholder.png';
          }}
          // onLoad={() => {
          //   console.log('Image loaded successfully:', product.image);
          // }}
        />

        {product.badge && (
          <div className="absolute top-4 left-4 flex items-center gap-1 bg-gradient-to-r from-[#C9A86A] to-[#C9A86A]/90 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
            {product.badge === "Bestseller" ? (
              <Star className="w-3 h-3" />
            ) : (
              <Sparkles className="w-3 h-3" />
            )}
            {product.badge}
          </div>
        )}
      </Link>

      {/* CONTENT + CART CONTROLS */}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        {/* Title links to details as well */}
        <Link
          href={`/products/${product.slug}`}
          className="font-serif text-xl md:text-2xl text-gray-800 mb-2 group-hover:text-[#0A7A4E] transition-colors line-clamp-2"
        >
          {product.name}
        </Link>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
          {product.benefit || product.description || 'Premium quality product'}
        </p>

        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-2xl font-bold text-[#0A7A4E]">
            ₹{product.price || product.displayPrice}
          </span>
          {product.mrp && product.mrp !== product.price && (
            <>
              <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
              <span className="text-xs font-semibold text-[#C9A86A] bg-[#C9A86A]/10 px-2 py-1 rounded">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-3">
          {/* Add to cart / qty controls */}
          {qtyInCart === 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-[#0A7A4E] hover:bg-[#0A7A4E]/90 text-white py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-[#0A7A4E]/30"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => updateQty(product.id, qtyInCart - 1)}
                className="flex-1 py-3 rounded-full border border-[#0A7A4E] text-[#0A7A4E] text-lg font-semibold"
              >
                -
              </button>
              <span className="px-6 py-3 rounded-full bg-[#0A7A4E]/5 text-[#0A7A4E] font-medium">
                {qtyInCart}
              </span>
              <button
                onClick={() => updateQty(product.id, qtyInCart + 1)}
                className="flex-1 py-3 rounded-full bg-[#0A7A4E] text-white text-lg font-semibold"
              >
                +
              </button>
            </div>
          )}

          {/* More info button (optional, in addition to image/title link) */}
          <Link
            href={`/products/${product.slug}`}
            className="w-full text-center text-sm font-medium text-[#0A7A4E] underline underline-offset-4 hover:opacity-80"
          >
            More info
          </Link>
        </div>
      </div>
    </div>
  );
}