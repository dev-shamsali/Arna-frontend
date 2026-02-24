'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ShieldCheck, FileText, Ban, AlertCircle, Scale } from 'lucide-react'
import Link from 'next/link'

export default function TermsConditionsContent() {
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
                            <span className="text-white">Terms & Conditions</span>
                        </nav>
                        <h1 className="font-serif text-4xl md:text-6xl text-white font-bold mb-6">
                            Terms & Conditions
                        </h1>
                        <p className="text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                            Welcome to arnaskincare.in. These Terms & Conditions govern your use of our website and the purchase of products from Arna Skincare.
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
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#1c1917] mb-2">Age 18+</h3>
                            <p className="text-slate-600 text-sm font-normal">Legally capable of entering binding agreements.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#b77f6b]/10 flex items-center justify-center mx-auto mb-4 text-[#b77f6b]">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#1c1917] mb-2">Herbal Products</h3>
                            <p className="text-slate-600 text-sm font-normal">Natural ingredients with varying results.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#c5a059]/10 flex items-center justify-center mx-auto mb-4 text-[#c5a059]">
                                <Scale className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#1c1917] mb-2">Indian Law</h3>
                            <p className="text-slate-600 text-sm font-normal">Governed by and interpreted under Indian laws.</p>
                        </div>
                    </div>

                    <div className="space-y-16 max-w-none">

                        {/* Eligibility */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">01.</span>
                                Eligibility
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">By using arnaskincare.in, you confirm that:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                    {[
                                        "You are at least 18 years old",
                                        "Legally capable of entering binding agreement"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-lg border border-emerald-100/50">
                                            <ShieldCheck className="w-5 h-5 text-[#1e5e3f] shrink-0" />
                                            <span className="text-sm font-semibold text-slate-800">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Products & Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">02.</span>
                                Products & Information
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">Arna Skincare offers herbal and natural skincare products. Product descriptions, images, pricing, and availability are provided for informational purposes and may change without notice.</p>
                                <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-[#b77f6b]">
                                    <p className="m-0 font-medium text-[#1c1917] italic">Actual product color or texture may slightly vary due to lighting, screen resolution, or batch differences.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Herbal & Skincare Disclaimer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">03.</span>
                                Herbal & Skincare Disclaimer
                            </h2>
                            <div className="mt-6 space-y-6">
                                <p className="text-slate-800 leading-relaxed">Our products are made using herbal and plant-based ingredients. Results may vary based on individual skin type, lifestyle, and usage.</p>
                                <ul className="list-none p-0 space-y-4">
                                    {[
                                        "We recommend performing a patch test before using any product.",
                                        "Arna Skincare is not responsible for allergic reactions or misuse of products.",
                                        "Our products are not intended to diagnose, treat, cure, or prevent any medical condition."
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex gap-4 items-start">
                                            <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-[#1c1917]">{idx + 1}</div>
                                            <span className="text-slate-800 leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Orders & Payments */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">04.</span>
                                Orders & Payments
                            </h2>
                            <div className="mt-6 space-y-4 text-slate-800 leading-relaxed">
                                <ul className="list-disc pl-6 space-y-2 text-slate-800">
                                    <li>All orders placed on arnaskincare.in are subject to acceptance</li>
                                    <li>Prices are listed in <span className="font-semibold text-[#1c1917]">INR</span> and are inclusive of applicable taxes unless stated</li>
                                    <li>Payments are processed securely via third-party payment gateways</li>
                                    <li>We do <span className="font-semibold text-[#1c1917]">not store</span> card or UPI details</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Shipping & Delivery */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">05.</span>
                                Shipping & Delivery
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">Shipping timelines are estimates and may vary based on location, courier partner, or unforeseen circumstances.</p>
                                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                                    <p className="m-0 text-amber-900 text-sm italic font-medium">
                                        Arna Skincare is not liable for delays caused by logistics partners or force majeure events.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Returns, Refunds & Cancellations */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">06.</span>
                                Returns, Refunds & Cancellations
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">Please refer to our separate <Link href="/refund-policy" className="text-[#b77f6b] font-semibold underline">Return / Refund Policy</Link> page for detailed information regarding returns, refunds, and cancellations.</p>
                            </div>
                        </motion.div>

                        {/* Intellectual Property */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">07.</span>
                                Intellectual Property
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">All content on arnaskincare.in is the property of Arna Skincare and may not be copied, reproduced, or used without prior written permission.</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                                    {[
                                        "Text",
                                        "Images",
                                        "Logos",
                                        "Product names",
                                        "Graphics"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 p-3 bg-stone-50 rounded-lg border border-stone-100">
                                            <div className="w-2 h-2 rounded-full bg-[#b77f6b]" />
                                            <span className="text-sm font-medium text-slate-800">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* User Conduct */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">08.</span>
                                User Conduct
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">You agree not to:</p>
                                <ul className="list-disc pl-6 space-y-2 text-slate-800">
                                    <li>Use the website for unlawful purposes</li>
                                    <li>Attempt to hack, damage, or disrupt the website</li>
                                    <li>Provide false or misleading information</li>
                                </ul>
                                <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-[#1e5e3f]">
                                    <p className="m-0 font-medium text-[#1c1917] italic">Violation may result in termination of access.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Limitation of Liability */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">09.</span>
                                Limitation of Liability
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">Arna Skincare shall not be liable for:</p>
                                <ul className="list-disc pl-6 space-y-2 text-slate-800">
                                    <li>Any indirect, incidental, or consequential damages</li>
                                    <li>Any adverse skin reactions</li>
                                    <li>Loss arising from misuse of products or website</li>
                                </ul>
                                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                                    <p className="m-0 text-amber-900 text-sm italic font-medium">
                                        <span className="font-bold underline text-amber-950">Important:</span> Use of products and website is at your own risk.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Governing Law */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">10.</span>
                                Governing Law
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India.</p>
                            </div>
                        </motion.div>

                        {/* Changes to Terms */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">11.</span>
                                Changes to Terms
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">Arna Skincare reserves the right to update or modify these Terms at any time. Continued use of the website implies acceptance of the revised Terms.</p>
                            </div>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-[2rem] bg-slate-900 text-white"
                        >
                            <h2 className="text-white text-xl md:text-2xl mb-6 font-serif font-bold">Contact Information</h2>
                            <p className="text-white/70 font-light leading-relaxed mb-6">
                                For any questions regarding these Terms & Conditions, contact us at:
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                                    <AlertCircle className="w-5 h-5 text-[#b77f6b] shrink-0" />
                                    <p className="m-0 text-sm text-white/80">
                                        Email: <a href="mailto:official@arnaskincare.in" className="text-[#b77f6b] underline">official@arnaskincare.in</a>
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                                    <AlertCircle className="w-5 h-5 text-[#b77f6b] shrink-0" />
                                    <p className="m-0 text-sm text-white/80">
                                        Website: <a href="https://arnaskincare.in" className="text-[#b77f6b] underline">https://arnaskincare.in</a>
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Agreement */}
                        <div className="text-center pt-8">
                            <p className="text-slate-400 text-sm mb-4">By using arnaskincare.in, you agree to these Terms & Conditions.</p>
                            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-100">
                                <span className="text-sm font-medium text-slate-600">Have questions about our terms?</span>
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