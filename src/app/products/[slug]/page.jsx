"use client";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { use } from "react";
import { ShoppingCart, Shield, Truck, Leaf, MessageCircle, Loader2, Award, Sparkles, ArrowLeft } from "lucide-react";
import { useGetProductQuery } from "@/redux/slices/cmsSlice";
import Footer from "@/components/layout/footer"; 

export default function ProductPage({ params }) {
  const { slug } = use(params);
  const router = useRouter();

  // RTK Query hook to fetch product data
  const { data, isLoading, isError } = useGetProductQuery(slug);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-[#0A7A4E] mx-auto" />
          <p className="text-gray-600 text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  // Show error or not found state
  if (isError || !data?.success || !data?.data) {
    notFound();
  }

  const product = data.data;

  // Calculate discount percentage
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const displayPrice = product.salePrice || product.price;
  const originalPrice = product.price;

  // WhatsApp integration - Opens WhatsApp with prefilled message
  const handleWhatsAppOrder = () => {
    const phoneNumber = "919082742221"; // Your WhatsApp business number
    const message = encodeURIComponent(
      `Hi, I'm interested in buying: ${product.name}\nPrice: ₹${displayPrice}`
    );
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;

    try {
      const parsedUrl = new URL(url);

      // youtube.com/watch?v=xxxx
      if (parsedUrl.hostname.includes("youtube.com")) {
        return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}`;
      }

      // youtu.be/xxxx
      if (parsedUrl.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
      }
    } catch (err) {
      return null;
    }

    return null;
  };
  const videoEmbedUrl = getYouTubeEmbedUrl(product.link);
  console.log(
    "link", videoEmbedUrl
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0A7A4E] transition-colors duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">

          {/* Left Column - Product Image */}
          <div className="space-y-4">
            {/* Main product image with enhanced styling */}
            <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 lg:p-12 lg:sticky lg:top-8">
              <div className="relative aspect-square">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              {/* Discount badge overlay */}
              {discount > 0 && (
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg">
                  {discount}% OFF
                </div>
              )}

              {/* Professional Badges - Top Left */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-2">
                {product.isBestSeller && (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-800 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg shadow-md backdrop-blur-sm">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                    <span className="text-xs sm:text-sm font-semibold tracking-wide">Best Seller</span>
                  </div>
                )}
                {product.isNewArrival && (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-800 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg shadow-md backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <span className="text-xs sm:text-sm font-semibold tracking-wide">New Arrival</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-5 sm:space-y-6">
            {/* Status Badges - Mobile View (Above Title) */}
            <div className="flex flex-wrap gap-2 lg:hidden">
              {product.isBestSeller && (
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-800 px-3 py-2 rounded-lg shadow-sm">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-semibold tracking-wide">Best Seller</span>
                </div>
              )}
              {product.isNewArrival && (
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-800 px-3 py-2 rounded-lg shadow-sm">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold tracking-wide">New Arrival</span>
                </div>
              )}
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
              {product.description && (
                <p className="text-base sm:text-lg text-gray-600 mt-2 sm:mt-3 leading-relaxed">
                  {product.description}
                </p>
              )}
              {videoEmbedUrl && (
                <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 space-y-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    How to Use This Product
                  </h2>

                  <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                    <iframe
                      src={videoEmbedUrl}
                      title="Product usage video"
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  <p className="text-sm sm:text-base text-gray-600">
                    Watch this short video to understand how to use this product effectively.
                  </p>
                </div>
              )}

              <p className="text-sm text-gray-500 mt-2 capitalize">
                Category: <span className="font-medium">{product.category}</span>
              </p>
            </div>

            {/* Trust Badges - Add credibility */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-green-50 text-green-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-green-200">
                <Leaf className="w-3 h-3 sm:w-4 sm:h-4" />
                100% Natural
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-blue-200">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                Quality Assured
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-purple-200">
                <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
                Fast Delivery
              </div>
            </div>

            {/* Pricing Section - Enhanced visual hierarchy */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-green-100 shadow-sm">
              <div className="flex flex-wrap items-baseline gap-3 sm:gap-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Special Price</p>
                  <span className="text-4xl sm:text-5xl font-bold text-[#0A7A4E]">
                    ₹{displayPrice}
                  </span>
                </div>

                {product.salePrice && (
                  <div className="flex flex-col">
                    <span className="text-lg sm:text-xl line-through text-gray-400 font-medium">
                      ₹{originalPrice}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-red-600">
                      Save ₹{originalPrice - displayPrice}
                    </span>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      Price for {product.quantity} {product.unit}
                    </p>

                  </div>
                )}
              </div>

              {/* Show percentage saved */}
              {discount > 0 && (
                <div className="mt-3 pt-3 border-t border-green-200">
                  <p className="text-xs sm:text-sm text-gray-600">
                    🎉 You save <span className="font-bold text-[#0A7A4E]">{discount}%</span> on this purchase!
                  </p>
                </div>
              )}
            </div>

            {/* Call-to-Action Section */}
            <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
              {/* Primary CTA - WhatsApp Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-gradient-to-r from-[#0A7A4E] to-[#0d9959] hover:from-[#0d9959] hover:to-[#0A7A4E] text-white font-semibold py-4 sm:py-5 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg group cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                Buy Through WhatsApp
              </button>

              {/* Secondary action - Save for later (placeholder for future cart feature) */}
              <button
                disabled
                className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 sm:py-5 px-6 sm:px-8 rounded-xl border-2 border-gray-200 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg opacity-50 cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                Add to Cart (Coming Soon)
              </button>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 rounded-xl p-5 sm:p-6 space-y-3 mt-6 sm:mt-8 border border-gray-100">
              <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-3 sm:mb-4">Product Features</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5 sm:mt-1">✓</span>
                  <span>Premium quality ingredients</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5 sm:mt-1">✓</span>
                  <span>Carefully sourced and tested</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5 sm:mt-1">✓</span>
                  <span>Secure packaging and fast delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5 sm:mt-1">✓</span>
                  <span>Customer support available</span>
                </li>
              </ul>
            </div>

            {/* Help Section */}
            <div className="border-t border-gray-200 pt-5 sm:pt-6 mt-5 sm:mt-6">
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                Need help? Contact us on WhatsApp for instant support
              </p>
              <p className="text-xs sm:text-sm text-gray-600 text-center mt-1 font-medium">
                +91 9082742221
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section - Below the fold */}
      <div className="bg-white border-t border-gray-200 py-10 sm:py-12 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="space-y-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">Secure Shopping</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Your data is safe with us</p>
            </div>

            <div className="space-y-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Truck className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">Fast Delivery</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Quick shipping to your door</p>
            </div>

            <div className="space-y-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">24/7 Support</h3>
              <p className="text-gray-600 text-xs sm:text-sm">We're here to help anytime</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
}