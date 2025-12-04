'use client'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Target, Eye, CheckCircle2, Sparkles } from 'lucide-react'

// Professional SVG Pattern
const GridPatternSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#grid)" />
  </svg>
)

// Professional Image Component with better integration
function SectionImage({ src, alt, priority = false, badge }) {
  return (
    <motion.div
      className="relative w-full h-full min-h-[400px] md:min-h-[500px] rounded-xl overflow-hidden group"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading={priority ? 'eager' : 'lazy'}
          quality={85}
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {badge && (
        <motion.div
          className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {badge.icon && <badge.icon className="w-4 h-4 text-green-600" />}
          <span className="text-sm font-medium text-gray-900">{badge.text}</span>
        </motion.div>
      )}
    </motion.div>
  )
}

// Professional Card Component
function MissionCard({ items, delay = 0 }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-start gap-4 p-4 rounded-lg bg-white border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300 group"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + index * 0.1 }}
          whileHover={{ x: 4 }}
        >
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-gray-700 text-base leading-relaxed flex-1">
            <span className="font-semibold text-gray-900">{item.bold}</span> {item.text}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

export default function MissionVision() {
  const prefersReducedMotion = useReducedMotion()

  const fadeIn = {
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
    whileInView: prefersReducedMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, ease: 'easeOut' }
  }

  const missionItems = [
    { bold: 'Herbal, skin-friendly products', text: 'backed by nature.' },
    { bold: 'Premium skincare affordable', text: 'so everyone can experience real results.' },
    { bold: 'Transparency, purity, and quality', text: 'in every ARNA product.' },
    { bold: 'Clean beauty', text: 'that cares for their skin and the planet.' },
  ]

  return (
    <section className="relative w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full">
          <GridPatternSVG className="w-full h-full" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-64 h-64 text-green-50 -z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-full h-full" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Compact */}
        <motion.div
          {...fadeIn}
          className="mb-12 sm:mb-16 md:mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-green-50 border border-green-100">
            <Target className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 uppercase tracking-wide">Our Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 tracking-tight">
            Mission & Vision
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-600 to-transparent mx-auto mb-4" />
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Building India&apos;s most trusted herbal skincare brand
          </p>
        </motion.div>

        {/* Mission Section - Compact Grid */}
        <motion.div
          {...fadeIn}
          className="mb-16 sm:mb-20 md:mb-24"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <SectionImage
                src="/about/mission.jpg"
                alt="ARNA Mission - Herbal skincare products backed by nature"
                priority={true}
                badge={{ icon: Target, text: 'Our Mission' }}
              />
            </div>

            {/* Content Card */}
            <motion.div
              className="order-1 lg:order-2 flex flex-col justify-center bg-gradient-to-br from-white to-green-50/30 rounded-xl p-6 sm:p-8 border border-gray-100 shadow-sm"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">01</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Mission</h3>
                </div>
              </div>
              <MissionCard items={missionItems} delay={0.3} />
            </motion.div>
          </div>
        </motion.div>

        {/* Vision Section - Compact Grid */}
        <motion.div
          {...fadeIn}
          className="mb-8"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Content Card */}
            <motion.div
              className="flex flex-col justify-center bg-gradient-to-br from-white to-green-50/30 rounded-xl p-6 sm:p-8 border border-gray-100 shadow-sm"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center shadow-lg">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">02</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Vision</h3>
                </div>
              </div>
              
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="p-5 rounded-lg bg-white border-l-4 border-green-600 shadow-sm">
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed">
                    To become India&apos;s most trusted herbal skincare brand, bringing the purity of nature into every home.
                  </p>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-lg bg-white border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300 group">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                      <Sparkles className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed">
                    We aim to <span className="font-semibold text-gray-900">redefine beauty</span> with safe, natural, and effective skincare that helps people <span className="font-semibold text-gray-900">glow with confidence</span> — without compromises.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Image */}
            <div className="order-2 lg:order-2">
              <SectionImage
                src="/about/vision.jpg"
                alt="ARNA Vision - India's most trusted herbal skincare brand"
                badge={{ icon: Eye, text: 'Our Vision' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA Section - Compact */}
        <motion.div
          {...fadeIn}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-50 border border-green-100">
            <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            <span className="text-sm font-medium text-gray-700">
              Committed to excellence in natural skincare
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
