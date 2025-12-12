"use client";
import { getProductBySlug, getAllProducts } from "../../../components/lib/services/product.service";
import Image from "next/image";
import { notFound } from "next/navigation";
import { use } from "react";
import { ShoppingCart, Shield, Truck, Leaf, MessageCircle } from "lucide-react";

export default function ProductPage({ params }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const discount = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
  );

  // WhatsApp integration - Opens WhatsApp with prefilled message
  const handleWhatsAppOrder = () => {
    const phoneNumber = "919876543210"; // Replace with your actual WhatsApp business number
    const message = encodeURIComponent(
      `Hi, I'm interested in buying: ${product.name}\nPrice: ₹${product.price}`
    );
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Left Column - Product Image */}
          <div className="space-y-4">
            {/* Main product image with enhanced styling */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-12 sticky top-8">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              
              {/* Discount badge overlay */}
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  {discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mt-3 leading-relaxed">
                {product.benefit}
              </p>
            </div>

            {/* Trust Badges - Add credibility */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                <Leaf className="w-4 h-4" />
                100% Natural
              </div>
              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                Quality Assured
              </div>
              <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                <Truck className="w-4 h-4" />
                Fast Delivery
              </div>
            </div>

            {/* Pricing Section - Enhanced visual hierarchy */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div className="flex flex-wrap items-baseline gap-4">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Special Price</p>
                  <span className="text-5xl font-bold text-[#0A7A4E]">
                    ₹{product.price}
                  </span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-xl line-through text-gray-400 font-medium">
                    ₹{product.mrp}
                  </span>
                  <span className="text-lg font-bold text-red-600">
                    Save ₹{product.mrp - product.price}
                  </span>
                </div>
              </div>
              
              {/* Show percentage saved */}
              <div className="mt-3 pt-3 border-t border-green-200">
                <p className="text-sm text-gray-600">
                  🎉 You save <span className="font-bold text-[#0A7A4E]">{discount}%</span> on this purchase!
                </p>
              </div>
            </div>

            {/* Call-to-Action Section */}
            <div className="space-y-4 pt-4">
              {/* Primary CTA - WhatsApp Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#0A7A4E] hover:bg-[#129d47] text-white font-semibold py-5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg group cursor-pointer"
              >
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Buy Through WhatsApp
              </button>

              {/* Secondary action - Save for later (placeholder for future cart feature) */}
              <button
                disabled
                className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-5 px-8 rounded-xl border-2 border-gray-200 transition-all duration-300 flex items-center justify-center gap-3 text-lg opacity-50 cursor-not-allowed"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart (Coming Soon)
              </button>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-3 mt-8">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Product Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Premium quality ingredients</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Carefully sourced and tested</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Secure packaging and fast delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Customer support available</span>
                </li>
              </ul>
            </div>

            {/* Help Section */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <p className="text-sm text-gray-600 text-center">
                Need help? Contact us on WhatsApp for instant support
              </p>
              <p className="text-sm text-gray-600 text-center">
                +91 8097120326
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section - Below the fold */}
      <div className="bg-white border-t border-gray-200 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900">Secure Shopping</h3>
              <p className="text-gray-600 text-sm">Your data is safe with us</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Quick shipping to your door</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900">24/7 Support</h3>
              <p className="text-gray-600 text-sm">We're here to help anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}