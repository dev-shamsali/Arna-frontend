'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { 
    id: 1, 
    title: 'Pro-Planet', 
    text: 'Plastic-free, compostable refills keep mother nature happy.',
    icon: 'leaf'
  },
  { 
    id: 2, 
    title: '24HR Protection', 
    text: 'Science-backed formula leaves you smelling fresh all day.',
    icon: 'shield'
  },
  { 
    id: 3, 
    title: 'Convenient', 
    text: 'We deliver straight to your door whenever you want.',
    icon: 'delivery'
  },
  { 
    id: 4, 
    title: 'Plant-Powered', 
    text: 'All natural, free from aluminium, parabens and 100% vegan.',
    icon: 'plant'
  },
  { 
    id: 5, 
    title: 'Dermatologist Tested', 
    text: 'Gentle on sensitive skin, tested and approved by experts.',
    icon: 'certified'
  },
  { 
    id: 6, 
    title: 'Long Lasting', 
    text: 'One bottle lasts months with daily use for maximum value.',
    icon: 'clock'
  },
]

// Icon component
const FeatureIcon = ({ type }) => {
  const icons = {
    leaf: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    shield: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    delivery: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    ),
    plant: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    certified: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    clock: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }
  
  return icons[type] || icons.leaf
}

export default function BestProductHighlight() {
  const sectionRef = useRef(null)
  const productRef = useRef(null)
  const featuresRef = useRef([])
  const circleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Circle animation
      if (circleRef.current) {
        gsap.from(circleRef.current, {
          scale: 0.5,
          opacity: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        })
      }

      // Product entrance
      gsap.from(productRef.current, {
        scale: 0.85,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      })

      // Continuous floating
      gsap.to(productRef.current, {
        y: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Features staggered entrance
      featuresRef.current.forEach((feature, index) => {
        if (feature) {
          gsap.from(feature, {
            scale: 0,
            opacity: 0,
            duration: 0.7,
            delay: 0.4 + index * 0.1,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
            },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="w-full bg-white py-16 lg:py-20 overflow-hidden relative"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-emerald-50/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold mb-2">
            Why Choose Arna
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight">
            Reasons to be <span className="font-semibold">Fussy</span>
          </h2>
        </motion.div>

        {/* Desktop: Circular Layout */}
        <div className="hidden lg:block">
          <div className="relative w-full mx-auto" style={{ height: '700px', maxWidth: '1000px' }}>
            {/* Decorative circles */}
            <div 
              ref={circleRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="relative">
                <div className="w-[650px] h-[650px] border border-slate-200/60 rounded-full" />
                <div className="absolute inset-0 w-[650px] h-[650px] border border-emerald-100/40 rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
              </div>
            </div>

            {/* Center Product - No background, just image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div ref={productRef} className="relative">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="relative"
                >
                  <div className="relative w-[260px] h-[260px]">
                    <Image
                      src="/products/vitamin-c-serum.png"
                      alt="Arna Vitamin C Serum"
                      fill
                      sizes="260px"
                      className="object-contain drop-shadow-2xl"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 -z-10 rounded-full bg-linear-to-br from-emerald-200/30 via-amber-100/20 to-orange-200/20 blur-[60px] scale-110" />
              </div>
            </div>

            {/* Features arranged in circle */}
            {features.map((feature, index) => {
              // Calculate circular position
              const angle = (index * 360) / features.length - 90
              const radian = (angle * Math.PI) / 180
              const radius = 325
              const x = Math.cos(radian) * radius
              const y = Math.sin(radian) * radius
              
              const isLeft = x < -50

              return (
                <div
                  key={feature.id}
                  ref={(el) => (featuresRef.current[index] = el)}
                  className="absolute top-1/2 left-1/2 z-10"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <motion.div
                    className={`flex items-start gap-3 ${
                      isLeft ? 'flex-row-reverse' : 'flex-row'
                    }`}
                    style={{ width: '260px' }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {/* Icon */}
                    <div className="shrink-0">
                      <motion.div 
                        className="w-12 h-12 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 shadow-lg flex items-center justify-center text-white relative overflow-hidden group cursor-pointer"
                        whileHover={{ scale: 1.15, rotate: 360 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                      >
                        <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
                        <FeatureIcon type={feature.icon} />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div 
                      className={`flex-1 ${
                        isLeft ? 'text-right' : 'text-left'
                      }`}
                    >
                      <h4 className="text-base font-semibold text-slate-900 mb-1 tracking-tight">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-light">
                        {feature.text}
                      </p>
                    </div>
                  </motion.div>

                  {/* Connecting line to center */}
                  <svg
                    className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-30"
                    width={radius - 140}
                    height="2"
                    style={{
                      transformOrigin: isLeft ? 'right center' : 'left center',
                      transform: `translateX(${isLeft ? '50%' : '-50%'}) rotate(${angle}deg)`,
                    }}
                  >
                    <line
                      x1="0"
                      y1="1"
                      x2={radius - 140}
                      y2="1"
                      stroke="url(#lineGradient)"
                      strokeWidth="1"
                      strokeDasharray="6 3"
                    />
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile & Tablet: Grid Layout */}
        <div className="lg:hidden">
          {/* Product */}
          <div className="flex justify-center mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-[280px] mx-auto">
                <Image
                  src="/products/vitamin-c-serum.png"
                  alt="Arna Vitamin C Serum"
                  fill
                  sizes="(min-width: 640px) 280px, 240px"
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="group"
              >
                <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300">
                  <div className="shrink-0">
                    <div className="w-11 h-11 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 shadow-md flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <FeatureIcon type={feature.icon} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-900 mb-1 tracking-tight">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {feature.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/products"
            className="group relative inline-flex items-center justify-center px-10 py-3.5 rounded-full bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
          >
            <span className="absolute inset-0 bg-linear-to-r from-emerald-700 to-emerald-800 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 tracking-wide">Shop Bestsellers</span>
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-10 py-3.5 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 hover:border-emerald-500 transition-all duration-300"
          >
            <span className="tracking-wide">Contact Us</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
