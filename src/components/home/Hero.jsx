'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  const videoRef = useRef(null)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setVideoError(true)
      return
    }

    const playVideo = async () => {
      try {
        video.muted = true
        await video.play()
      } catch (err) {
        console.error('Video playback failed:', err)
        setVideoError(true)
      }
    }

    const handleError = () => {
      setVideoError(true)
    }

    video.addEventListener('error', handleError)

    if (video.readyState >= 3) {
      playVideo()
    } else {
      video.addEventListener('loadeddata', playVideo, { once: true })
      video.addEventListener('canplay', playVideo, { once: true })
    }

    return () => {
      video.removeEventListener('error', handleError)
    }
  }, [])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Arna Skin Care",
    "description": "Arna Skin Care offers pure, natural, botanical skin products crafted from true nature for a healthy glow."
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-900">

      {/* Background Video - Full Screen */}
      {!videoError && (
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover min-w-full min-h-full"
          style={{ zIndex: 0 }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/videos/arna-hero.mp4" type="video/mp4" />
          <source src="/videos/arna-hero.webm" type="video/webm" />
        </video>
      )}

      {/* Lighter Overlay - 40% opacity, no blur */}
      <div className="absolute inset-0 bg-black/40" style={{ zIndex: 1 }} />

      {/* Content - Responsive Padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center relative" style={{ zIndex: 2 }}>
        <div className="max-w-4xl text-center w-full px-4">

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight"
          >
            ARNA — Pure. Natural. Honest.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed"
          >
            ARNA Skin Care products are crafted from true nature — 
            pure botanicals, clean ingredients, and timeless rituals 
            that nourish your skin every day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link 
              href="/products" 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-black rounded-md shadow-lg hover:opacity-95 transition-opacity text-sm sm:text-base font-medium"
            >
              Our Products
            </Link>

            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-white/70 text-white rounded-md bg-white/10 hover:bg-white/20 transition-all text-sm sm:text-base font-medium"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade - Responsive Height */}
      <div className="absolute bottom-0 left-0 w-full h-20 sm:h-28 bg-linear-to-t from-black/60 to-transparent pointer-events-none" style={{ zIndex: 1 }} />

      {/* SEO JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd)
      }} />
    </section>
  )
}
