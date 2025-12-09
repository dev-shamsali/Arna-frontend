'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { 
    id: 1, 
    title: 'Eco-Friendly', 
    text: 'Plastic-free, compostable packaging for sustainable beauty.',
    icon: 'leaf',
    stat: '100%'
  },
  { 
    id: 2, 
    title: '24HR Protection', 
    text: 'Clinically proven formula for all-day freshness.',
    icon: 'shield',
    stat: '24h'
  },
  { 
    id: 3, 
    title: 'Fast Delivery', 
    text: 'Direct to your doorstep with flexible subscription.',
    icon: 'delivery',
    stat: '2-3d'
  },
  { 
    id: 4, 
    title: 'Plant-Powered', 
    text: 'Natural ingredients, free from harsh chemicals.',
    icon: 'plant',
    stat: '100%'
  },
  { 
    id: 5, 
    title: 'Expert Tested', 
    text: 'Dermatologically approved for sensitive skin.',
    icon: 'certified',
    stat: 'Tested'
  },
  { 
    id: 6, 
    title: 'Long Lasting', 
    text: 'Premium formula that lasts months with daily use.',
    icon: 'clock',
    stat: '3+ mo'
  },
]

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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    plant: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
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
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (shouldReduceMotion) return

      gsap.from(productRef.current, {
        scale: 0.85,
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      gsap.to(productRef.current, {
        y: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      featuresRef.current.forEach((feature, index) => {
        if (feature) {
          gsap.from(feature, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            delay: 0.2 + index * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [shouldReduceMotion])

  return (
    <section 
      ref={sectionRef} 
      className="w-full relative py-12 md:py-16 lg:py-20 overflow-hidden bg-white"
    >
      {/* Subtle background texture [web:26] */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Minimal Professional Header [web:16] */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="inline-block mb-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-semibold">
              Premium Skincare
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight">
            Why Choose{' '}
            <span className="font-semibold">Arna</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto font-light">
            Science-backed formulations crafted with nature's finest ingredients
          </p>
        </motion.div>

        {/* Main Grid Layout - Professional & Compact [web:25] */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center max-w-6xl mx-auto">
          
          {/* Left Features - Desktop Only */}
          <div className="hidden lg:block lg:col-span-4 space-y-5">
            {features.slice(0, 3).map((feature, index) => (
              <motion.div
                key={feature.id}
                ref={(el) => (featuresRef.current[index] = el)}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="flex items-start gap-3 p-4 rounded-lg border border-slate-100 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-50 transition-all duration-300 bg-white">
                  <div className="shrink-0 mt-0.5">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 group-hover:bg-emerald-50 flex items-center justify-center text-slate-600 group-hover:text-emerald-600 transition-all duration-300 border border-slate-200 group-hover:border-emerald-200">
                      <FeatureIcon type={feature.icon} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 mb-1 leading-tight">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {feature.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Product [web:16][web:26] */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div ref={productRef} className="relative">
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {/* Subtle shadow effect */}
                <div className="absolute -inset-8 bg-gradient-to-b from-emerald-100/20 via-transparent to-slate-100/30 rounded-full blur-2xl" />
                
                <div className="relative w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] lg:w-[320px] lg:h-[320px]">
                  <Image
                    src="/products/vitamin-c-serum.png"
                    alt="Arna Vitamin C Serum"
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 300px, 260px"
                    className="object-contain drop-shadow-xl"
                    priority
                    quality={95}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Features - Desktop Only */}
          <div className="hidden lg:block lg:col-span-4 space-y-5">
            {features.slice(3, 6).map((feature, index) => (
              <motion.div
                key={feature.id}
                ref={(el) => (featuresRef.current[index + 3] = el)}
                whileHover={{ x: -5 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="flex items-start gap-3 flex-row-reverse text-right p-4 rounded-lg border border-slate-100 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-50 transition-all duration-300 bg-white">
                  <div className="shrink-0 mt-0.5">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 group-hover:bg-emerald-50 flex items-center justify-center text-slate-600 group-hover:text-emerald-600 transition-all duration-300 border border-slate-200 group-hover:border-emerald-200">
                      <FeatureIcon type={feature.icon} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 mb-1 leading-tight">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {feature.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile/Tablet Grid [web:25] */}
          <div className="lg:hidden col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                ref={(el) => (featuresRef.current[index] = el)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                className="group"
              >
                <div className="flex items-start gap-3 p-4 rounded-lg border border-slate-100 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-50 transition-all duration-300 bg-white h-full">
                  <div className="shrink-0 mt-0.5">
                    <div className="w-9 h-9 rounded-lg bg-slate-50 group-hover:bg-emerald-50 flex items-center justify-center text-slate-600 group-hover:text-emerald-600 transition-all duration-300 border border-slate-200 group-hover:border-emerald-200">
                      <FeatureIcon type={feature.icon} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 mb-1 leading-tight">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {feature.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Professional CTA Section [web:28] */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/products"
            className="group relative inline-flex items-center justify-center px-8 py-3 rounded-md bg-slate-900 text-white text-sm font-medium shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden w-full sm:w-auto"
          >
            <span className="absolute inset-0 bg-emerald-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              Explore Products
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>

          <Link
            href="/#contact"
            className="group inline-flex items-center justify-center px-8 py-3 rounded-md border-2 border-slate-300 text-slate-700 text-sm font-medium hover:border-slate-900 hover:bg-slate-50 transition-all duration-300 w-full sm:w-auto"
          >
            <span className="flex items-center gap-2">
              Contact Us
              <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </span>
          </Link>
        </motion.div>

        {/* Trust Indicators - Professional [web:16] */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-500"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Dermatologist Approved</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-slate-300" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Cruelty Free</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-slate-300" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">100% Vegan</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
