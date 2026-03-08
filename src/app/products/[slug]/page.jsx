"use client";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { useState, use } from "react";
import { ShoppingCart, Shield, Truck, Leaf, MessageCircle, Loader2, Award, Sparkles, ArrowLeft, Minus, Plus } from "lucide-react";
import { useGetProductQuery } from "@/redux/slices/cmsSlice";
import Footer from "@/components/layout/footer";
import { useCart } from "@/components/cart/CartContext";
import { useGetMeQuery } from "@/redux/slices/authApislice";
import LoginModal from "@/components/login/LoginModal";

export default function ProductPage({ params }) {
  const { slug } = use(params);
  const router = useRouter();
  const { addToCart, updateQty, getItemQty } = useCart();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { data, isLoading, isError } = useGetProductQuery(slug);
  const { data: userData } = useGetMeQuery();

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

  if (isError || !data?.success || !data?.data) {
    notFound();
  }

  const product = data.data;

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const displayPrice = product.salePrice || product.price;
  const originalPrice = product.price;

  const handleWhatsAppOrder = () => {
    const phoneNumber = "919082742221";
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
      if (parsedUrl.hostname.includes("youtube.com")) {
        return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}`;
      }
      if (parsedUrl.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
      }
    } catch (err) {
      return null;
    }
    return null;
  };

  const videoEmbedUrl = getYouTubeEmbedUrl(product.link);

  const productId = product._id || product.id;
  const qtyInCart = getItemQty(productId);
  const normalizedProduct = {
    ...product,
    id: productId,
    image: product.image?.startsWith("http")
      ? product.image
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image}`,
    displayPrice: product.salePrice || product.price,
    mrp: product.price,
    price: product.salePrice || product.price,
  };

  return (
    /*
      Your navbar has TWO rows (logo row + search bar row) so it's ~112px tall on mobile.
      pt-28 = 112px — safely clears the full navbar height on mobile.
      Adjust this value if your navbar height differs.
    */
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-28 sm:pt-32 lg:pt-8">

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 lg:pt-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0A7A4E] transition-colors duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium text-sm sm:text-base">Back</span>
        </button>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16">

          {/* ── LEFT: Image Column ── */}
          <div className="w-full">

            {/* Image Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100">

              {/* Image */}
              <div className="p-5 sm:p-8 lg:p-10">
                <div className="w-full aspect-square">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-xl"
                    loading="lazy"
                  />
                </div>
              </div>

              {/*
                Badges sit INSIDE the card but BELOW the image — in normal document flow.
                This means they are NEVER clipped, NEVER hidden behind a navbar,
                and always render cleanly on every screen size.
              */}
              {(product.isBestSeller || product.isNewArrival || discount > 0) && (
                <div className="flex flex-wrap gap-2 px-5 pb-5 sm:px-8 sm:pb-6">
                  {product.isBestSeller && (
                    <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm">
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      Best Seller
                    </div>
                  )}
                  {product.isNewArrival && (
                    <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      New Arrival
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="inline-flex items-center gap-1.5 bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
                      {discount}% OFF
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Product Details ── */}
          <div className="flex flex-col gap-5">

            {/* Title & Description */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
                {product.name}
              </h1>
              {product.description && (
                <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
                  {product.description}
                </p>
              )}
              <p className="text-xs sm:text-sm text-gray-500 mt-2 capitalize">
                Category: <span className="font-medium">{product.category}</span>
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium border border-green-200">
                <Leaf className="w-3.5 h-3.5" />
                100% Natural
              </div>
              <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium border border-blue-200">
                <Shield className="w-3.5 h-3.5" />
                Quality Assured
              </div>
              <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-xs font-medium border border-purple-200">
                <Truck className="w-3.5 h-3.5" />
                Fast Delivery
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-5 border border-green-100 shadow-sm">
              <p className="text-xs text-gray-500 font-medium mb-1">Special Price</p>
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-4xl sm:text-5xl font-bold text-[#0A7A4E]">
                  ₹{displayPrice}
                </span>
                {product.salePrice && (
                  <div className="flex flex-col">
                    <span className="text-base sm:text-lg line-through text-gray-400 font-medium leading-tight">
                      ₹{originalPrice}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-red-600 leading-tight">
                      Save ₹{originalPrice - displayPrice}
                    </span>
                  </div>
                )}
              </div>
              {product.quantity && product.unit && (
                <p className="text-xs text-gray-500 mt-1">
                  Price for {product.quantity} {product.unit}
                </p>
              )}
              {discount > 0 && (
                <div className="mt-2 pt-2 border-t border-green-200">
                  <p className="text-xs text-gray-600">
                    🎉 You save <span className="font-bold text-[#0A7A4E]">{discount}%</span> on this purchase!
                  </p>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-gradient-to-r from-[#0A7A4E] to-[#0d9959] hover:from-[#0d9959] hover:to-[#0A7A4E] text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base group cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Buy Through WhatsApp
              </button>

              {qtyInCart === 0 ? (
                <button
                  onClick={() => addToCart(normalizedProduct)}
                  className="w-full bg-white hover:bg-gray-50 text-[#0A7A4E] font-semibold py-4 px-6 rounded-xl border-2 border-[#0A7A4E] transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base group cursor-pointer"
                >
                  <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center justify-between gap-3 p-1.5 bg-gray-50 rounded-xl border-2 border-gray-100">
                  <button
                    onClick={() => updateQty(productId, qtyInCart - 1)}
                    className="flex-1 py-3 rounded-lg bg-white border border-gray-200 text-[#0A7A4E] flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-bold text-[#0A7A4E] min-w-[2.5rem] text-center">
                    {qtyInCart}
                  </span>
                  <button
                    onClick={() => updateQty(productId, qtyInCart + 1)}
                    className="flex-1 py-3 rounded-lg bg-[#0A7A4E] text-white flex items-center justify-center hover:bg-[#0A7A4E]/90 transition-colors shadow-sm"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              )}

              <button
                className="w-full bg-gradient-to-r from-[#0A7A4E] to-[#0d9959] hover:from-[#0d9959] hover:to-[#0A7A4E] text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base group cursor-pointer"
                onClick={() => {
                  if (!userData?.user) {
                    setIsLoginModalOpen(true);
                    return;
                  }
                  if (qtyInCart === 0) {
                    addToCart(normalizedProduct);
                    setTimeout(() => {
                      router.push("/checkout");
                    }, 100);
                  } else {
                    router.push("/checkout");
                  }
                }}
              >
                Buy Now
              </button>
            </div>

            {/* YouTube Video */}
            {videoEmbedUrl && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  How to Use This Product
                </h2>
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={videoEmbedUrl}
                    title="Product usage video"
                    className="absolute inset-0 w-full h-full rounded-lg border border-gray-100"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Watch this short video to understand how to use this product effectively.
                </p>
              </div>
            )}

            {/* Product Features */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-3">Product Features</h3>
              <ul className="space-y-2">
                {[
                  "Premium quality ingredients",
                  "Carefully sourced and tested",
                  "Secure packaging and fast delivery",
                  "Customer support available",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                    <span className="text-green-600 mt-0.5 shrink-0">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div className="border-t border-gray-200 pt-4 text-center">
              <p className="text-xs text-gray-500">Need help? Contact us on WhatsApp for instant support</p>
              <p className="text-xs font-semibold text-gray-700 mt-1">+91 9082742221</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-white border-t border-gray-200 py-10 sm:py-12 mt-10 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-xs sm:text-base">Secure Shopping</h3>
              <p className="text-gray-500 text-xs hidden sm:block">Your data is safe with us</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-xs sm:text-base">Fast Delivery</h3>
              <p className="text-gray-500 text-xs hidden sm:block">Quick shipping to your door</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-xs sm:text-base">24/7 Support</h3>
              <p className="text-gray-500 text-xs hidden sm:block">We're here to help anytime</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        redirectPath="/checkout"
      />
    </div>
  );
}