'use client'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useGetProductsQuery } from '@/redux/slices/cmsSlice'

const BRAND = '#b77f6b'
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000/api'

export default function ProductGrid() {
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const autoScrollIntervalRef = useRef(null)

  // Fetch bestseller products from the backend
  const { data, isLoading, isError } = useGetProductsQuery({ isBestSeller: 'true' })
  const products = data?.data || []

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  // Auto-scroll functionality
  useEffect(() => {
    if (products.length > 0 && scrollContainerRef.current) {
      checkScrollPosition()

      // Start auto-scroll
      autoScrollIntervalRef.current = setInterval(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current

          // If reached the end, scroll back to start
          if (scrollLeft >= scrollWidth - clientWidth - 10) {
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
          } else {
            // Scroll by one card width
            const cardWidth = scrollContainerRef.current.querySelector('.product-card')?.offsetWidth || 300
            scrollContainerRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' })
          }
        }
      }, 3000) // Auto-scroll every 3 seconds

      return () => {
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current)
        }
      }
    }
  }, [products])

  // Manual scroll functions
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      // Pause auto-scroll temporarily
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }

      const cardWidth = scrollContainerRef.current.querySelector('.product-card')?.offsetWidth || 300
      const scrollAmount = direction === 'left' ? -(cardWidth + 24) : cardWidth + 24

      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })

      // Resume auto-scroll after 5 seconds
      setTimeout(() => {
        if (products.length > 0) {
          autoScrollIntervalRef.current = setInterval(() => {
            if (scrollContainerRef.current) {
              const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
              if (scrollLeft >= scrollWidth - clientWidth - 10) {
                scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
              } else {
                const cardWidth = scrollContainerRef.current.querySelector('.product-card')?.offsetWidth || 300
                scrollContainerRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' })
              }
            }
          }, 3000)
        }
      }, 5000)
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-12 md:py-24 bg-[#f8f5f2]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-xs tracking-[0.3em] text-[#b77f6b] uppercase mb-3">Our Selection</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1c1917]">Bestsellers</h2>
            <p className="mt-3 text-stone-600 text-sm md:text-base max-w-xl mx-auto font-light">
              Our most-loved picks — effective, safe and sustainably formulated.
            </p>
          </div>
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-[280px] md:w-[320px] rounded-2xl overflow-hidden bg-white border border-stone-100 shadow-[0_8px_30px_rgba(183,127,107,0.06)] animate-pulse">
                <div className="w-full aspect-square bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Show error state
  if (isError) {
    return (
      <section className="py-12 md:py-24 bg-[#f8f5f2]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center">
            <p className="text-red-500">Failed to load bestseller products. Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }

  // If no bestsellers found
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-24 bg-[#f8f5f2]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <p className="text-xs tracking-[0.3em] text-[#b77f6b] uppercase mb-3">Our Selection</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1c1917]">Bestsellers</h2>
          <p className="mt-3 text-stone-600 text-sm md:text-base max-w-xl mx-auto font-light">
            Our most-loved picks — effective, safe and sustainably formulated.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg border border-stone-200 flex items-center justify-center bg-[#b77f6b] text-white transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-1/2"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg border border-stone-200 flex items-center justify-center bg-[#b77f6b] text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-1/2"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollPosition}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {products.map((product, i) => {
              const displayPrice = product.salePrice || product.price
              const hasDiscount = product.salePrice && product.salePrice < product.price

              return (
                <motion.article
                  key={product._id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="product-card flex-shrink-0 w-[280px] md:w-[320px] group/card relative flex flex-col rounded-2xl overflow-hidden bg-white border border-stone-100 shadow-[0_8px_30px_rgba(183,127,107,0.06)] hover:shadow-[0_12px_40px_rgba(183,127,107,0.12)] transition-all duration-300"
                >
                  {/* Image area */}
                  <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-700 group-hover/card:scale-110">
                      <Image
                        src={`${BACKEND_URL}${product.image}`}
                        alt={product.name}
                        fill
                        sizes="320px"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        quality={85}
                      />
                    </div>

                    {/* Price badge */}
                    <div
                      className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm border border-stone-100 text-sm font-bold shadow-sm"
                      style={{ color: BRAND }}
                    >
                      {hasDiscount && (
                        <span className="line-through text-gray-400 text-xs mr-2">₹{product.price}</span>
                      )}
                      <span>₹{displayPrice}</span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-bold text-slate-800 mb-2 group-hover/card:text-[#b77f6b] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-4 font-light leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 bg-emerald-500"
                        style={{
                          boxShadow: '0 8px 20px rgba(16, 185, 129, 0.2)',
                        }}
                      >
                        View
                      </Link>

                      <Link
                        href="/contact"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition-colors"
                      >
                        Ask
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>

        {/* CTA group */}
        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link
            href="/products"
            className="w-full sm:w-auto px-10 py-4 rounded-xl text-white font-bold text-sm uppercase tracking-widest shadow-xl transform transition hover:scale-105 bg-emerald-500"
            style={{ boxShadow: '0 12px 40px rgba(16, 185, 129, 0.2)' }}
          >
            All Products
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-10 py-4 rounded-xl border border-stone-200 text-stone-800 font-bold text-sm uppercase tracking-widest hover:bg-stone-50 transition-all hover:scale-105"
          >
            Contact us
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
