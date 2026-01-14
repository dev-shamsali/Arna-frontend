'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const BRAND = '#0a7a4e'

const products = [
  { id: 2, name: 'Shea Butter Moisturizer', img: '/products/shea-butter-moisturizer.png', price: '₹199', desc: 'Rich hydration with natural shea', fit: 'cover' },
  { id: 3, name: 'Sunscreen SPF 50+', img: '/products/sunscreen-SPF50+.png', price: '₹349', desc: 'Lightweight protection, non-greasy', fit: 'contain' },
]

export default function ProductGrid() {
  return (
    <section
      className="px-6 py-16 bg-white"
      style={{ '--brand': BRAND }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-serif font-semibold text-[#072e1a]">Bestsellers</h2>
          <p className="mt-3 text-gray-600">Our most-loved picks — effective, safe and sustainably formulated.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.02, y: -6 }}
              className="product-grid-group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_8px_30px_rgba(10,122,78,0.06)] will-change-transform transition"
              style={{ minHeight: 420 }} // consistent card height so titles never cut
            >
              {/* Image area */}
              <div className="relative w-full aspect-4/3 bg-gray-50 flex items-center justify-center overflow-hidden">
                {p.fit === 'contain' ? (
                  <div className="w-full h-full p-6 flex items-center justify-center transition-transform duration-700 group-hover:scale-105 will-change-transform">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      style={{ objectFit: 'contain', objectPosition: 'center' }}
                      priority={i < 2}
                      quality={85}
                      loading={i < 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 will-change-transform">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      priority={i < 2}
                      quality={85}
                      loading={i < 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                )}

                {/* Price badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-md bg-white/95 border border-gray-100 text-sm font-medium shadow-sm transition-colors price-badge"
                  style={{ color: BRAND }}
                >
                  <span>{p.price}</span>
                </div>

                {/* subtle green glow on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity"
                  style={{
                    background: 'linear-gradient(180deg, rgba(10,122,78,0.04) 0%, rgba(10,122,78,0.08) 100%)',
                    mixBlendMode: 'overlay',
                  }}
                />
              </div>

              {/* Card content */}
              <div className="p-5 flex flex-col flex-1">
                <div>
                  <h3
                    className="text-lg font-semibold text-slate-800 mb-1 transition-colors product-title"
                    style={{ transitionProperty: 'color, transform' }}
                  >
                    <span>{p.name}</span>
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{p.desc}</p>
                </div>

                <div className="flex-1" />

                <div
                  className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-3 transition-colors"
                >
                  <Link
                    href={`/products/${p.id}`}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-md text-white font-semibold text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{
                      backgroundColor: BRAND,
                      boxShadow: '0 10px 30px rgba(10,122,78,0.18)',
                      minWidth: 120,
                    }}
                    aria-label={`View ${p.name}`}
                  >
                    View
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-gray-200 text-sm font-medium hover:bg-gray-50"
                    aria-label={`Contact about ${p.name}`}
                  >
                    Contact Us
                  </Link>
                </div>

                <div className="mt-3 text-xs text-gray-400">Free shipping above ₹2,000 • 30-day returns</div>
              </div>

              {/* Hover outline + border transition */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl pointer-events-none transition-shadow"
                style={{
                  boxShadow: 'inset 0 0 0 0 rgba(10,122,78,0)',
                }}
              />
            </motion.article>
          ))}
        </div>

        {/* CTA group */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link
            href="/products"
            className="px-8 py-3 rounded-xl text-white font-semibold shadow-lg transform transition"
            style={{ backgroundColor: BRAND, boxShadow: '0 12px 40px rgba(10,122,78,0.2)' }}
          >
            See All Products
          </Link>

          <Link
            href="/contact"
            className="px-8 py-3 rounded-xl border border-gray-200 text-slate-800 font-medium hover:bg-gray-50"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
