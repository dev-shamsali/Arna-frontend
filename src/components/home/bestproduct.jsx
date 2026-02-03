'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)


const productCards = [
  {
    id: 1,
    title: 'Moisturizer',
    category: 'Daily Hydration',
    keyIngredient: 'Hyaluronic Acid'
  },
  {
    id: 2,
    title: 'Night Cream',
    category: 'Overnight Repair',
    keyIngredient: 'Retinol 0.5%'
  },
  {
    id: 3,
    title: 'Sunscreen SPF 50+',
    category: 'UV Protection',
    keyIngredient: 'Zinc Oxide'
  },
  {
    id: 4,
    title: 'Vitamin C Serum',
    category: 'Brightening Treatment',
    keyIngredient: 'L-Ascorbic Acid 15%'
  },
  {
    id: 5,
    title: 'Cleansing Bar',
    category: 'Gentle Purification',
    keyIngredient: 'Tea Tree Oil'
  }
]


const topFeatures = [
  {
    title: 'Natural Ingredients',
    subtitle: 'Plant-based actives',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  },
  {
    title: 'Fragrance Free',
    subtitle: 'Sensitive skin safe',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'Clinically Tested',
    subtitle: 'Dermatologist approved',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    title: 'Clean Formulation',
    subtitle: 'Paraben-free certified',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
]


// Uniform Size Card Component with Light to Dark Green Gradient
const UniformCard3D = ({ product, cardRef }) => {
  const router = useRouter()
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()


  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return


    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top


    const centerX = rect.width / 2
    const centerY = rect.height / 2


    const rotateXValue = ((y - centerY) / centerY) * -4
    const rotateYValue = ((x - centerX) / centerX) * 4


    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }


  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }


  const handleClick = () => {
    router.push('/products')
  }


  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="group cursor-pointer"
      style={{
        perspective: '1500px',
        transformStyle: 'preserve-3d'
      }}
      whileHover={{ scale: shouldReduceMotion ? 1 : 1.03 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div
        className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl border border-slate-200/50 transition-all duration-500"
        style={{
          height: '280px',
          transform: shouldReduceMotion
            ? 'none'
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isHovered ? '10px' : '0px'})`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out, box-shadow 0.5s ease'
        }}
      >
        {/* White Background */}
        <div
          className="absolute inset-0 bg-white"
          style={{
            transform: 'translateZ(-10px)',
            transformStyle: 'preserve-3d'
          }}
        />

        {/* Base Layer */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 transition-opacity duration-500"
          style={{
            transform: 'translateZ(1px)',
            transformStyle: 'preserve-3d'
          }}
        />

        {/* Dark Accent Overlay (Appears on Hover) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#1c1917] via-[#2d2421] to-[#1c1917] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            transform: 'translateZ(2px)',
            transformStyle: 'preserve-3d'
          }}
        />


        {/* Shimmer Effect */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            transform: `translateZ(5px) translateX(${rotateY * 2}px) translateY(${rotateX * 2}px)`,
            transformStyle: 'preserve-3d'
          }}
        />


        {/* Top Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b77f6b]/60 to-[#d1a394]/60 group-hover:from-[#b77f6b] group-hover:to-[#d1a394] transition-all duration-500"
          style={{
            transform: 'translateZ(12px)',
            transformStyle: 'preserve-3d'
          }}
        />


        {/* Card Content - Fixed Height Layout */}
        <div className="relative p-6 h-full flex flex-col justify-between">


          {/* Category badge */}
          <div
            className="inline-flex items-center gap-2 w-fit"
            style={{
              transform: 'translateZ(18px)',
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="w-2 h-2 rounded-full bg-[#b77f6b] group-hover:bg-[#d1a394] transition-colors duration-500" />
            <span className="text-[9px] uppercase tracking-[0.18em] text-stone-600 group-hover:text-white font-semibold transition-colors duration-500">
              {product.category}
            </span>
          </div>


          {/* Product title - Centered */}
          <div
            className="flex-1 flex items-center justify-center"
            style={{
              transform: 'translateZ(22px)',
              transformStyle: 'preserve-3d'
            }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-slate-900 group-hover:text-white text-center leading-tight tracking-tight transition-colors duration-500">
              {product.title}
            </h3>
          </div>


          {/* Key ingredient badge and arrow */}
          <div
            className="pt-4 border-t border-stone-200/60 group-hover:border-stone-400/40 transition-colors duration-500"
            style={{
              transform: 'translateZ(20px)',
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[8px] uppercase tracking-wider text-stone-500 group-hover:text-orange-200 font-semibold mb-1 transition-colors duration-500">
                  Key Active
                </p>
                <p className="text-xs font-medium text-[#b77f6b] group-hover:text-white transition-colors duration-500">
                  {product.keyIngredient}
                </p>
              </div>


              {/* Arrow Icon */}
              <div
                className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-white/20 flex items-center justify-center transition-all duration-500"
                style={{
                  transform: isHovered ? 'translateZ(10px)' : 'translateZ(5px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <svg
                  className="w-5 h-5 text-[#b77f6b] group-hover:text-white group-hover:translate-x-1 transition-all duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Shadow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-stone-900/5 to-transparent group-hover:from-stone-950/30 pointer-events-none transition-colors duration-500"
          style={{
            transform: 'translateZ(-5px)',
            transformStyle: 'preserve-3d'
          }}
        />


        {/* Corner Glow */}
        <div
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-[#b77f6b]/0 to-transparent opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-700 pointer-events-none"
          style={{
            transform: 'translateZ(3px)',
            transformStyle: 'preserve-3d'
          }}
        />
      </div>
    </motion.div>
  )
}


export default function ArnaProductShowcase() {
  const sectionRef = useRef(null)
  const heroContentRef = useRef(null)
  const featureRefs = useRef([])
  const cardRefs = useRef([])
  const shouldReduceMotion = useReducedMotion()


  useEffect(() => {
    if (shouldReduceMotion) return


    const ctx = gsap.context(() => {
      gsap.from(heroContentRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      })


      featureRefs.current.forEach((feature, index) => {
        if (feature) {
          gsap.from(feature, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            delay: 0.1 + index * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            }
          })
        }
      })


      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.9,
            delay: 0.3 + index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          })
        }
      })
    }, sectionRef)


    return () => ctx.revert()
  }, [shouldReduceMotion])


  return (
    <section
      ref={sectionRef}
      className="w-full relative py-16 md:py-20 lg:py-24 overflow-hidden bg-[#f8f5f2]"
    >
      {/* Enhanced Background with Brand Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-white to-stone-100 pointer-events-none" />


      {/* Radial gradient overlays for depth */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-[#b77f6b]/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[#c5a059]/10 via-transparent to-transparent blur-3xl pointer-events-none" />


      {/* Subtle dark green accent areas */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-emerald-200/20 via-emerald-100/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-gradient-radial from-green-200/20 via-green-100/10 to-transparent blur-3xl pointer-events-none" />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">




        {/* Compact Main Layout with Tighter Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center mb-8 md:mb-12">


          {/* LEFT CARD */}
          <div className="lg:col-span-3 hidden lg:block">
            <UniformCard3D
              product={productCards[0]}
              cardRef={(el) => (cardRefs.current[0] = el)}
            />
          </div>


          {/* CENTER CONTENT - Smaller Heading */}
          <motion.div
            ref={heroContentRef}
            className="lg:col-span-6 text-center py-6 md:py-8 flex items-center"
            style={{ minHeight: '280px' }}
          >
            <div className="w-full">
              <div className="inline-block mb-3">
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-[#b77f6b] font-bold">
                  Premium Skincare
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-stone-900 mb-3 tracking-tight leading-tight">
                Professional
                <br />
                <span className="font-semibold bg-gradient-to-r from-[#b77f6b] via-[#d1a394] to-[#b77f6b] bg-clip-text text-transparent">
                  Collection
                </span>
              </h2>
              <p className="text-xs md:text-sm text-slate-600 max-w-lg mx-auto font-light leading-relaxed">
                Clinically-proven formulations crafted with precision and care
              </p>
            </div>
          </motion.div>


          {/* RIGHT CARD */}
          <div className="lg:col-span-3 hidden lg:block">
            <UniformCard3D
              product={productCards[1]}
              cardRef={(el) => (cardRefs.current[1] = el)}
            />
          </div>
        </div>


        {/* Bottom Row - 3 Cards with Tighter Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16 max-w-6xl mx-auto">
          {productCards.slice(2, 5).map((product, index) => (
            <UniformCard3D
              key={product.id}
              product={product}
              cardRef={(el) => (cardRefs.current[index + 2] = el)}
            />
          ))}
        </div>


        {/* Mobile cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mb-12 md:mb-16 lg:hidden max-w-2xl mx-auto">
          <UniformCard3D
            product={productCards[0]}
            cardRef={(el) => (cardRefs.current[5] = el)}
          />
          <UniformCard3D
            product={productCards[1]}
            cardRef={(el) => (cardRefs.current[6] = el)}
          />
        </div>


        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-center"
        >
          <Link
            href="/products"
            className="group relative inline-flex items-center justify-center px-12 py-4 rounded-full bg-gradient-to-r from-[#b77f6b] to-[#8e5d4d] text-white text-sm md:text-base font-semibold shadow-lg hover:shadow-2xl hover:shadow-[#b77f6b]/40 transition-all duration-500 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#8e5d4d] to-[#b77f6b] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-2 tracking-wide">
              Explore All Products
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>


        </motion.div>
      </div>
    </section>
  )
}
