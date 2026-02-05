'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const CONCERNS = [
    {
        id: 'glow',
        title: 'Ultimate Glow',
        desc: 'Brighten and Revitalize',
        image: '/home/hero/hero-2.jpg', // Reusing existing hero images or placeholders if needed
        color: '#b77f6b'
    },
    {
        id: 'acne',
        title: 'Acne Control',
        desc: 'Clear and Balance',
        image: '/home/hero/hero-3.jpg',
        color: '#8e5d4d'
    },
    {
        id: 'hydration',
        title: 'Deep Hydration',
        desc: 'Moisturize and Plump',
        image: '/home/hero/hero-4.jpg',
        color: '#c5a059'
    },
    {
        id: 'hair',
        title: 'Hair Strength',
        desc: 'Nourish and Repair',
        image: '/home/hero/hero-5.jpg',
        color: '#2d2421'
    }
]

export default function ShopByConcern() {
    return (
        <section className="relative w-full py-16 md:py-32 bg-[#1e5e3f] overflow-hidden">
            {/* Background soft gradients */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#b77f6b]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#c5a059]/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-12 md:mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[#b77f6b] text-xs md:text-sm uppercase tracking-[0.3em] font-semibold mb-3 md:mb-4"
                    >
                        Targeted Solutions
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6"
                    >
                        Shop by Concern
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/40 max-w-2xl mx-auto text-xs md:text-base font-light leading-relaxed px-4"
                    >
                        Don't just shop for products. Shop for results. Our targeted formulations address your unique skin and hair needs.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    {CONCERNS.map((concern, i) => (
                        <motion.div
                            key={concern.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="group relative h-[260px] md:h-[380px] rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl bg-stone-100"
                        >
                            {/* Image with overlay */}
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src={concern.image}
                                    alt={concern.title}
                                    fill
                                    className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Lighter, more sophisticated gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent transition-opacity duration-500" />
                            </div>

                            {/* Content - Positioned to the left for landscape feel */}
                            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-center items-start text-left max-w-[85%] md:max-w-[70%]">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                >
                                    <h3 className="text-white font-serif text-2xl md:text-4xl mb-2 md:mb-3 tracking-tight">
                                        {concern.title}
                                    </h3>
                                    <p className="text-white/80 text-xs md:text-base font-light mb-6 md:mb-8 line-clamp-2">
                                        {concern.desc}
                                    </p>

                                    <Link
                                        href={`/products?concern=${concern.id}`}
                                        className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-[#b77f6b] text-white rounded-xl text-xs md:text-sm font-bold uppercase tracking-widest shadow-lg hover:bg-[#8e5d4d] transition-all group/btn"
                                    >
                                        <span>Explore</span>
                                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Decorative brand glow */}
                            <div className="absolute inset-0 border border-white/10 group-hover:border-[#b77f6b]/30 transition-colors duration-500 rounded-[2rem] pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
