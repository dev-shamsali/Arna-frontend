'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

export default function AboutHero() {
  const prefersReduced = useReducedMotion()

  return (
    <header className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/about/about-hero.jpg"
        alt="Botanical textures and natural ingredients"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        className="z-0"
      />

      {/* Darker Overlay for better contrast */}
      <div
        className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/75"
        aria-hidden="true"
      />

      {/* Content block — centered vertically and horizontally */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
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
              letterSpacing: '-0.02em'
            }}
          >
            Naturally Pure, <br />
            <span className="font-semibold">Beautifully Effective</span>
          </motion.h1>

          <motion.p 
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-6 text-white/95 text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto"
          >
            At ARNA Skin Care we believe real beauty begins with nature. We craft safe,
            effective and 100% herbal formulations that nourish skin while respecting the planet.
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
              aria-label="Learn more about ARNA"
            >
              <span className="absolute inset-0 bg-emerald-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <span className="relative z-10">Learn More</span>
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white rounded-full font-semibold bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:border-white/60 transition-all duration-300"
              aria-label="View our products"
            >
              Our Products
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
    </header>
  )
}
