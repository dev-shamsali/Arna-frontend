'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const BRAND = '#b77f6b'

const products = [
  { id: 2, name: 'Shea Butter Moisturizer', img: '/products/shea-butter-moisturizer.png', price: '₹199', desc: 'Rich hydration with natural shea', fit: 'cover' },
  { id: 3, name: 'Sunscreen SPF 50+', img: '/products/sunscreen-SPF50+.png', price: '₹349', desc: 'Lightweight protection, non-greasy', fit: 'contain' },
]

export default function ProductGrid() {
  return (
    <section className="py-12 md:py-24 bg-[#f8f5f2]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <p className="text-xs tracking-[0.3em] text-[#b77f6b] uppercase mb-3">Our Selection</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1c1917]">Bestsellers</h2>
          <p className="mt-3 text-stone-600 text-sm md:text-base max-w-xl mx-auto font-light">
            Our most-loved picks — effective, safe and sustainably formulated.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.02, y: -6 }}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-stone-100 shadow-[0_8px_30px_rgba(183,127,107,0.06)] will-change-transform transition"
              style={{ minHeight: 380 }}
            >
              {/* Image area */}
              <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
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
                    />
                  </div>
                )}

                {/* Price badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-white/95 border border-stone-100 text-sm font-bold shadow-sm"
                  style={{ color: BRAND }}
                >
                  <span>{p.price}</span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 flex flex-col flex-1">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-[#b77f6b] transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4 font-light leading-relaxed">{p.desc}</p>
                </div>

                <div className="flex-1" />

                <div className="mt-4 pt-4 border-t border-stone-50 flex items-center justify-between gap-3">
                  <Link
                    href={`/products/${p.id}`}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-widest transition-transform active:scale-95 bg-emerald-500"
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
          ))}
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
    </section>
  )
}
