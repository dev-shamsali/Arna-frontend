'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative w-full overflow-hidden py-20"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-20 h-full w-full">
        <Image
          src="/home/about-bg.jpg"
          alt="Botanical background for ARNA"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          quality={85}
        />
      </div>

      {/* Dark overlay for readability */}
      <div
  className="absolute inset-0 -z-10 bg-linear-to-b from-black/55 via-black/50 to-black/55 backdrop-blur-[1px]"
  aria-hidden="true"
/>


      {/* Content */}
      <div className="relative z-10 w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* small label on top */}
          <p className="text-xl tracking-wider fonyt text-white uppercase mb-3">
            About Us
          </p>

          {/* big brand title */}
          <h1
            id="about-heading"
            className="font-serif text-white font-bold"
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 3.25rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
            }}
          >
            ARNA Skin Care
          </h1>

          {/* body text */}
          <p className="mt-6 text-white/95 text-sm sm:text-base md:text-lg leading-relaxed">
            At ARNA Skin Care, we believe real beauty starts with nature. Our mission is simple — to
            bring you pure, herbal, and chemical-free skincare that actually works. From glow-boosting
            fairness creams to complete face and body care, every product is crafted with natural
            ingredients, gentle formulations, and zero side-effects.
          </p>

          <p className="mt-4 text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
            We’re committed to giving your skin the love it deserves while keeping everything 100% herbal,
            safe, and effective — all at prices that won’t hurt your pocket. Choose ARNA. Created by Nature. 🌿✨
          </p>

          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/products"
              aria-label="View ARNA products"
              className="inline-block px-5 py-3 bg-white text-black rounded-md shadow-sm hover:opacity-95"
            >
              View Products
            </Link>

            <Link
              href="/#contact"
              aria-label="Contact ARNA Skin Care"
              className="inline-block px-5 py-3 border border-white/60 text-white rounded-md bg-white/5 hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
