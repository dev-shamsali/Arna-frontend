'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ShieldCheck, RefreshCcw, Ban, Clock, CreditCard } from 'lucide-react'
import Link from 'next/link'

export default function RefundPolicyContent() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-[#1e5e3f]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#14422c] via-[#1e5e3f] to-[#14422c]" />

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                    <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#b77f6b]/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#c5a059]/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <nav className="flex justify-center items-center gap-2 text-white/60 text-xs uppercase tracking-widest mb-6">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-white">Refund & Return Policy</span>
                        </nav>
                        <h1 className="font-serif text-4xl md:text-6xl text-white font-bold mb-6">
                            Returns & Refunds
                        </h1>
                        <p className="text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                            At Arna Skincare, customer satisfaction is our priority. We want to ensure your experience with our botanical formulations is as pure and transparent as our ingredients.
                        </p>
                        <p className="text-[#b77f6b] mt-6 text-sm font-medium tracking-widest uppercase">
                            Last Updated: February 01, 2026
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 md:py-32">
                <div className="max-w-4xl mx-auto px-6">

                    {/* Quick Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#1e5e3f]/10 flex items-center justify-center mx-auto mb-4 text-[#1e5e3f]">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#1c1917] mb-2">48 Hours</h3>
                            <p className="text-slate-600 text-sm font-normal">Window to report any issues after delivery.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#b77f6b]/10 flex items-center justify-center mx-auto mb-4 text-[#b77f6b]">
                                <RefreshCcw className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#1c1917] mb-2">Easy Exchange</h3>
                            <p className="text-slate-600 text-sm font-normal">For damaged or incorrect products received.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#c5a059]/10 flex items-center justify-center mx-auto mb-4 text-[#c5a059]">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#1c1917] mb-2">7-10 Days</h3>
                            <p className="text-slate-600 text-sm font-normal">Standard processing time for approved refunds.</p>
                        </div>
                    </div>

                    <div className="space-y-16 max-w-none">

                        {/* Cancellation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">01.</span>
                                Cancellation Policy
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">Orders can be cancelled only before they are shipped. Once the order is dispatched, cancellation is not possible due to logistical commitments with our delivery partners.</p>
                                <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-[#b77f6b]">
                                    <p className="m-0 font-medium text-[#1c1917] italic">To request cancellation, please contact us immediately at <a href="mailto:official@arnaskincare.in" className="text-[#b77f6b] no-underline">official@arnaskincare.in</a>.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Return Policy */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">02.</span>
                                Return Policy
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">Due to the delicate nature of herbal skincare and strict hygiene safety protocols, we do <span className="font-bold text-[#1c1917]">NOT</span> accept returns once the product seal has been broken or used.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                    {[
                                        "Damaged products upon arrival",
                                        "Incorrect product received",
                                        "Missing items from order"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-lg border border-emerald-100/50">
                                            <ShieldCheck className="w-5 h-5 text-[#1e5e3f] shrink-0" />
                                            <span className="text-sm font-semibold text-slate-800">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Conditions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">03.</span>
                                Conditions for Return
                            </h2>
                            <div className="mt-6 space-y-6">
                                <p className="text-slate-800 leading-relaxed">To be eligible for a return approval, must meet the following criteria:</p>
                                <ul className="list-none p-0 space-y-4">
                                    {[
                                        "The product must be unused, unopened, and in original packaging.",
                                        "The request must be raised within 48 hours of the delivery timestamp.",
                                        "An unboxing video or clear high-resolution images are required as proof."
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex gap-4 items-start">
                                            <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-[#1c1917]">{idx + 1}</div>
                                            <span className="text-slate-800 leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                                    <p className="m-0 text-amber-900 text-sm italic font-medium">
                                        <span className="font-bold underline text-amber-950">Important Note:</span> Without proper video or image proof of the damage/error, return requests may not be approved.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Refund Policy */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">04.</span>
                                Refund Policy
                            </h2>
                            <div className="mt-6 space-y-4 text-slate-800 leading-relaxed">
                                <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund.</p>
                                <ul className="list-disc pl-6 space-y-2 text-slate-800">
                                    <li>Approved refunds are processed within <span className="font-semibold text-[#1c1917]">7–10 working days</span>.</li>
                                    <li>Refunds will be credited strictly to the <span className="font-semibold text-[#1c1917]">original payment method</span>.</li>
                                    <li>Shipping charges (if any) paid at the time of purchase are non-refundable.</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Disclaimer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-[2rem] bg-slate-900 text-white"
                        >
                            <h2 className="text-white text-xl md:text-2xl mb-6 font-serif font-bold">Herbal & Allergy Disclaimer</h2>
                            <p className="text-white/70 font-light leading-relaxed mb-6">
                                Our products are made using herbal and natural ingredients. Individual skin reactions may vary. We highly recommend performing a patch test before full use.
                            </p>
                            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                                <Ban className="w-5 h-5 text-[#b77f6b] shrink-0" />
                                <p className="m-0 text-sm text-white/80 italic">Refunds will not be provided for allergic reactions or personal dissatisfaction with the product scent/texture.</p>
                            </div>
                        </motion.div>

                        {/* Support */}
                        <div className="text-center pt-8">
                            <p className="text-slate-400 text-sm mb-4">By placing an order on arnaskincare.in, you agree to this Refund & Return Policy.</p>
                            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-100">
                                <span className="text-sm font-medium text-slate-600">Need further assistance?</span>
                                <a
                                    href="mailto:official@arnaskincare.in"
                                    className="px-6 py-2 bg-[#1e5e3f] text-white rounded-lg text-sm font-bold transition-transform hover:scale-105"
                                >
                                    Contact Support
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
