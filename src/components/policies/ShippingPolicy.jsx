'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Truck, Timer, MapPin, Package, AlertCircle, Info } from 'lucide-react'
import Link from 'next/link'

export default function ShippingPolicyContent() {
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
                            <span className="text-white">Shipping Policy</span>
                        </nav>
                        <h1 className="font-serif text-4xl md:text-6xl text-white font-bold mb-6">
                            Shipping & Delivery
                        </h1>
                        <p className="text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                            Experience the journey of botanical luxury. We ensure every ARNA package is handled with care and delivered efficiently to your doorstep.
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

                    {/* Service Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#1e5e3f]/10 flex items-center justify-center mx-auto mb-4 text-[#1e5e3f]">
                                <Truck className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#1c1917] mb-2">Pan India</h3>
                            <p className="text-slate-600 text-sm font-normal">We deliver through trusted partners across the country.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#b77f6b]/10 flex items-center justify-center mx-auto mb-4 text-[#b77f6b]">
                                <Timer className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#1c1917] mb-2">Fast Transit</h3>
                            <p className="text-slate-600 text-sm font-normal">Average delivery window of 3–7 business days.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#c5a059]/10 flex items-center justify-center mx-auto mb-4 text-[#c5a059]">
                                <Package className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#1c1917] mb-2">Order Tracking</h3>
                            <p className="text-slate-600 text-sm font-normal">Stay updated with live tracking on every shipment.</p>
                        </div>
                    </div>

                    <div className="space-y-16 max-w-none">

                        {/* Locations */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col md:flex-row gap-10 items-start p-8 bg-stone-50 rounded-3xl border border-stone-100"
                        >
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 text-[#1e5e3f]">
                                <MapPin className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl text-[#1c1917] font-serif font-bold mt-0">01. Shipping Locations</h2>
                                <p className="mb-0 text-slate-800 leading-relaxed font-normal">We currently offer shipping services exclusively across <span className="font-bold text-[#1c1917]">India</span>. At this time, we do not support international shipments beyond Indian borders.</p>
                            </div>
                        </motion.div>

                        {/* Processing Time */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">02.</span>
                                Order Processing Time
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed font-normal">We know you're excited to receive your ARNA favorites. Our team works diligently to prepare your order:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                                    <div className="p-6 border border-stone-100 rounded-xl">
                                        <h4 className="m-0 text-[#1e5e3f] text-sm uppercase tracking-widest mb-2 font-bold">Standard Window</h4>
                                        <p className="m-0 text-3xl font-serif text-[#1c1917] font-bold">1–3 Days</p>
                                        <p className="m-0 text-xs text-slate-400 mt-2 italic">Standard processing period for confirmation.</p>
                                    </div>
                                    <div className="p-6 border border-slate-900 rounded-xl bg-[#1c1917] text-white">
                                        <h4 className="m-0 text-[#b77f6b] text-sm uppercase tracking-widest mb-2 font-bold">Weekends & Holidays</h4>
                                        <p className="m-0 text-lg font-light opacity-90">Orders placed on Sundays or public holidays will be processed on the next working day.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Delivery Time */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">03.</span>
                                Shipping & Delivery Time
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed font-normal">Estimated delivery time is typically <span className="font-bold text-[#1c1917]">3–7 business days</span> from the date of dispatch.</p>
                                <div className="bg-[#fdf2ef] p-6 rounded-xl border border-[#b77f6b]/20 flex gap-4">
                                    <div className="text-[#b77f6b] mt-1 shrink-0">
                                        <Info className="w-5 h-5" />
                                    </div>
                                    <p className="m-0 text-sm text-[#8e5d4d] leading-relaxed italic font-medium">
                                        Delivery timelines may vary based on your specific geographical location, the courier partner handling your shipment, weather conditions, or unforeseen circumstances beyond our control.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Charges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">04.</span>
                                Shipping Charges
                            </h2>
                            <div className="mt-6">
                                <p className="text-slate-800 leading-relaxed font-normal">Transparency is key to our values. All shipping charges are calculated upfront:</p>
                                <ul className="list-disc pl-6 space-y-2 text-slate-800">
                                    <li>Any applicable shipping fees will be clearly displayed during the <span className="font-semibold text-[#1c1917]">checkout process</span>.</li>
                                    <li>Free shipping may be offered periodically during special brand promotions or for orders exceeding a certain value.</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Tracking */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-[2rem] border-2 border-dashed border-stone-200"
                        >
                            <h2 className="text-[#1c1917] text-xl font-serif mb-4 flex items-center gap-2 font-bold">
                                Order Tracking
                            </h2>
                            <p className="text-sm text-slate-700 font-normal mb-0">
                                Once your order has been dispatched from our facility, you will receive a unique tracking link via <span className="font-bold text-[#1c1917]">SMS or email</span>. This allows you to monitor your package journey in real-time.
                            </p>
                        </motion.div>

                        {/* Damaged Packages */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-red-500 text-lg font-sans tabular-nums">08.</span>
                                Damaged Packages
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 font-normal">If you receive a package that appears compromised or damaged:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-red-50/50 border border-red-100">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-red-500 shrink-0 font-bold">1</div>
                                        <p className="m-0 text-sm font-semibold text-red-900 leading-snug">Do not accept the delivery from the courier agent if the seal is tampered.</p>
                                    </div>
                                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-red-50/50 border border-red-100">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-red-500 shrink-0 font-bold">2</div>
                                        <p className="m-0 text-sm font-semibold text-red-900 leading-snug">Record a continuous, clear unboxing video immediately upon arrival.</p>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                                    <p className="m-0 text-xs text-amber-950 font-semibold italic">Contact us within 48 hours at official@arnaskincare.in with your order ID and the video proof.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact */}
                        <div className="text-center pt-8">
                            <p className="text-slate-500 text-sm mb-4 font-medium">By placing an order on arnaskincare.in, you agree to this Shipping Policy.</p>
                            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-100 shadow-sm">
                                <span className="text-sm font-semibold text-slate-700">Still have questions?</span>
                                <a
                                    href="mailto:official@arnaskincare.in"
                                    className="px-8 py-3 bg-[#1e5e3f] text-white rounded-lg text-sm font-bold transition-all hover:scale-105 hover:shadow-lg active:scale-95"
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
