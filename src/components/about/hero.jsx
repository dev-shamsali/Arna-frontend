'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useGetAboutUsQuery } from '@/redux/slices/cmsSlice'
export default function AboutHero() {
  const prefersReduced = useReducedMotion()
  const [imageLoaded, setImageLoaded] = useState(false)

  // Fetch about data
  const { data: aboutData, isLoading, error } = useGetAboutUsQuery()

  const title = aboutData?.data?.title || ''
  const description = aboutData?.data?.description || ''
  const imageUrl = aboutData?.data?.imageUrl || '/about/about-hero.jpg'

  if (isLoading) {
    return (
      <header className="relative w-full h-screen min-h-[600px] flex items-center justify-center bg-slate-900">
        <div className="text-white text-lg">Loading...</div>
      </header>
    )
  }

  if (error) {
    console.error('Error loading about data:', error)
  }

  const titleParts = title.split(',')
  const firstPart = titleParts[0]?.trim() || 'Naturally Pure'
  const secondPart = titleParts[1]?.trim() || 'Beautifully Effective'

  return (
    <header className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center">

      {/* Background Image */}
      <img
        src={imageUrl}
        alt="Botanical textures and natural ingredients"
        loading="lazy"
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        className={`
          absolute inset-0 w-full h-full object-cover object-center
          transition-opacity duration-700 ease-out
          ${imageLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/75 z-10"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mx-auto max-w-3xl"
        >
          <motion.p
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={prefersReduced ? {} : { opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-md tracking-[0.3em] text-white/80 uppercase mb-6 font-medium"
          >
            About Arna
          </motion.p>

          <motion.h1
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="font-serif text-white font-light tracking-tight"
            style={{
              fontSize: 'clamp(2.75rem, 6vw, 5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {firstPart}
            {secondPart && (
              <>
                {', '}
                <br />
                <span className="font-semibold">{secondPart}</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-6 text-white/95 text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto"
          >
            {description}
          </motion.p>

          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/about"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-emerald-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <span className="relative z-10">Learn More</span>
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white rounded-full font-semibold bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:border-white/60 transition-all duration-300"
            >
              Our Products
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-20" />
    </header>
  )
}
