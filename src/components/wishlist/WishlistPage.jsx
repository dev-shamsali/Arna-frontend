'use client'
import { useWishlist } from './WishlistContext'
import { useCart } from '@/components/cart/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, X, ArrowLeft, CheckCircle } from 'lucide-react'

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product, 1)
  }

  const handleMoveAllToCart = () => {
    wishlistItems.forEach(item => addToCart(item, 1))
    clearWishlist()
  }

  // Empty State
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-gray-50 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Heart className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Wishlist is Empty
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            You haven't saved any products yet. Start shopping to add your favorites!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#006A4E] to-teal-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[70vh] bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-2">
              My Wishlist
            </h1>
            <p className="text-xl text-gray-600">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
            <button
              onClick={handleMoveAllToCart}
              className="px-8 py-3 bg-gradient-to-r from-[#006A4E] to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Move All to Cart
            </button>
            <button
              onClick={clearWishlist}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all duration-300"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <Link href={`/products/${item.slug || item._id}`} className="block h-full w-full">
                  <Image
                    src={item.image || '/placeholder-product.jpg'}
                    alt={item.name || 'Product'}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 z-20 border border-gray-200"
                  title="Remove from wishlist"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>

                {/* Badges */}
                <div className="absolute top-4 left-4 space-y-1">
                  {item.isBestSeller && (
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-md">
                      🔥 Best Seller
                    </span>
                  )}
                  {item.isNewArrival && (
                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-md">
                      ✨ New
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-white/90 backdrop-blur-sm py-2.5 px-4 rounded-xl text-sm font-semibold text-[#006A4E] border border-[#006A4E]/20 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Quick Add
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <Link href={`/products/${item.slug || item._id}`}>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-[#006A4E] transition-colors hover:underline">
                    {item.name}
                  </h3>
                </Link>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-6">
                  {item.salePrice ? (
                    <>
                      <span className="text-2xl font-bold text-[#006A4E]">
                        ₹{item.salePrice.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{item.price.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{item.price.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Main Add to Cart */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-gradient-to-r from-[#006A4E] to-teal-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-20">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 text-[#006A4E] hover:text-teal-600 font-semibold text-lg group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
