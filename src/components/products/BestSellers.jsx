"use client";
import { Award, Leaf } from "lucide-react";
import ProductCard from "../products/ProductsCard"

export default function BestSellers({ bestSellers }) {
  return (
    <section className="bg-gradient-to-r from-[#0A7A4E]/5 via-[#0A7A4E]/10 to-[#0A7A4E]/5 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-[#C9A86A]" />
            <h2 className="font-serif text-3xl md:text-4xl text-[#0A7A4E]">
              Best Sellers
            </h2>
          </div>
          <p className="text-gray-600">Our most loved products by customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>
      </div>
    </section>
  );
}
