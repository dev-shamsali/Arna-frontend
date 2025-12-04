'use client';
import { memo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaLeaf, FaRecycle, FaFlask, FaUsers } from 'react-icons/fa'

const cards = [
  {
    title: '100% Natural',
    description: 'All our products are made from pure, natural ingredients with no additives or harmful chemicals—ensuring safety for you and the environment.',
    icon: FaLeaf,
  },
  {
    title: 'Sustainably Sourced',
    description: 'We are committed to sustainability, prioritizing eco-friendly sourcing, recyclable packaging, and responsible practices in every step.',
    icon: FaRecycle,
  },
  {
    title: 'Scientifically Proven',
    description: 'Every product is backed by rigorous research and testing, delivering real, measurable results you can trust.',
    icon: FaFlask,
  },
  {
    title: 'Community-Driven',
    description: 'We actively support our farmer and artisan communities, ensuring fair trade and empowering local livelihoods.',
    icon: FaUsers,
  },
]

function WhyChooseUs() {
  return (
    <section className="relative w-full overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20 h-full w-full">
        <Image
          src="/home/about-bg.jpg"
          alt="Natural botanical background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={85}
        />
      </div>

      {/* Overlay for better readability */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-green-900/60 via-green-800/50 to-green-900/60"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Why Choose Us?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto px-2">
            Discover the natural difference: thoughtfully created products that put your health and the planet first.
          </p>
          <div className="w-20 h-0.5 bg-green-400 mx-auto mt-3 sm:mt-4" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => {
            const IconComponent = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 flex flex-col items-center text-center h-full cursor-pointer group relative overflow-hidden"
              >
                {/* Hover background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  initial={false}
                />

                {/* Icon container with animation */}
                <motion.div
                  className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 mb-4 text-green-600 z-10"
                  whileHover={{ 
                    scale: 1.15,
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <IconComponent className="w-full h-full" />
                  {/* Pulsing ring effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-green-400"
                    initial={{ scale: 1, opacity: 0 }}
                    whileHover={{ 
                      scale: 1.5, 
                      opacity: [0, 0.5, 0],
                      transition: { duration: 0.6, repeat: Infinity }
                    }}
                  />
                </motion.div>

                {/* Title with hover effect */}
                <motion.h3
                  className="text-lg sm:text-xl font-semibold text-green-800 mb-2 sm:mb-3 z-10 relative"
                  whileHover={{ color: '#059669' }}
                  transition={{ duration: 0.2 }}
                >
                  {card.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-sm sm:text-base text-green-700 leading-relaxed flex-grow z-10 relative"
                  whileHover={{ color: '#047857' }}
                  transition={{ duration: 0.2 }}
                >
                  {card.description}
                </motion.p>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-400 rounded-b-xl"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default memo(WhyChooseUs)
