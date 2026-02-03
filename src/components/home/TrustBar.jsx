'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Leaf, Sparkles, HeartPulse } from 'lucide-react'

const STAMPS = [
    {
        icon: Leaf,
        title: '100% Herbal',
        desc: 'Pure botanical extracts'
    },
    {
        icon: ShieldCheck,
        title: 'Chemical-Free',
        desc: 'No harsh synthetics'
    },
    {
        icon: HeartPulse,
        title: 'Zero Side Effects',
        desc: 'Gentle on all skin types'
    },
    {
        icon: Sparkles,
        title: 'Safe & Effective',
        desc: 'Results you can trust'
    }
]

export default function TrustBar() {
    return (
        <div className="relative z-20 w-full bg-[#f8f5f2] border-y border-stone-200 py-8 md:py-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                    {STAMPS.map((stamp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 group"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#b77f6b]/5 border border-[#b77f6b]/10 flex items-center justify-center group-hover:bg-[#b77f6b]/10 group-hover:border-[#b77f6b] transition-all duration-300">
                                <stamp.icon className="w-6 h-6 text-[#b77f6b]" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-[#1c1917] font-semibold text-sm md:text-base tracking-wide uppercase">
                                    {stamp.title}
                                </h4>
                                <p className="text-stone-500 text-xs md:text-sm font-light leading-tight">
                                    {stamp.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
