'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ShieldCheck, Lock, Eye, Cookie, Share2, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicyContent() {
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
                            <span className="text-white">Privacy Policy</span>
                        </nav>
                        <h1 className="font-serif text-4xl md:text-6xl text-white font-bold mb-6">
                            Privacy Policy
                        </h1>
                        <p className="text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                            Arna Skincare respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your data.
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
                                <Lock className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#1c1917] mb-2">Secure Data</h3>
                            <p className="text-slate-600 text-sm font-normal">Industry-standard security to protect your information.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#b77f6b]/10 flex items-center justify-center mx-auto mb-4 text-[#b77f6b]">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#1c1917] mb-2">No Card Storage</h3>
                            <p className="text-slate-600 text-sm font-normal">We don't store your payment credentials.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#c5a059]/10 flex items-center justify-center mx-auto mb-4 text-[#c5a059]">
                                <Eye className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#1c1917] mb-2">Your Rights</h3>
                            <p className="text-slate-600 text-sm font-normal">Access, correct, or delete your data anytime.</p>
                        </div>
                    </div>

                    <div className="space-y-16 max-w-none">

                        {/* Information We Collect */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">01.</span>
                                Information We Collect
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">When you use arnaskincare.in, we may collect the following information:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                                    {[
                                        "Full Name",
                                        "Email Address",
                                        "Phone Number",
                                        "Shipping & Billing Address",
                                        "Order & Purchase Details",
                                        "Payment Information",
                                        "IP Address & Device Info",
                                        "Website usage & cookies"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-lg border border-emerald-100/50">
                                            <div className="w-2 h-2 rounded-full bg-[#1e5e3f]" />
                                            <span className="text-sm font-semibold text-slate-800">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-[#b77f6b] mt-6">
                                    <p className="m-0 font-medium text-[#1c1917] italic">We do NOT store your debit/credit card details or UPI credentials.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* How We Use Your Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">02.</span>
                                How We Use Your Information
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">We use your information to:</p>
                                <ul className="list-none p-0 space-y-4">
                                    {[
                                        "Process orders and deliver products",
                                        "Communicate order status and updates",
                                        "Provide customer support",
                                        "Improve our herbal skincare products and services",
                                        "Understand skin & hair care preferences",
                                        "Send promotional offers (only if you opt-in)",
                                        "Prevent fraud and ensure website security"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex gap-4 items-start">
                                            <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-[#1c1917]">{idx + 1}</div>
                                            <span className="text-slate-800 leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Herbal & Product Disclaimer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">03.</span>
                                Herbal & Product Disclaimer
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">Arna Skincare is a herbal skincare company offering products made using plant-based, natural, and traditional ingredients. Individual skin types may react differently to herbal ingredients.</p>
                                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                                    <p className="m-0 text-amber-900 text-sm italic font-medium">
                                        <span className="font-bold underline text-amber-950">Important:</span> We strongly recommend performing a patch test before using any product. Information provided on arnaskincare.in is for general skincare awareness only and does not replace professional medical advice.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Cookies Policy */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">04.</span>
                                Cookies Policy
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">We use cookies and similar technologies to:</p>
                                <div className="grid grid-cols-1 gap-4 mt-6">
                                    {[
                                        "Improve website performance",
                                        "Analyze traffic and user behavior",
                                        "Remember user preferences"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-4 bg-stone-50 rounded-lg border border-stone-100">
                                            <Cookie className="w-5 h-5 text-[#c5a059] shrink-0" />
                                            <span className="text-sm font-semibold text-slate-800">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-[#1e5e3f] mt-6">
                                    <p className="m-0 font-medium text-[#1c1917] italic">You may disable cookies through your browser settings at any time.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Data Security */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">05.</span>
                                Data Security
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">We use industry-standard security measures to protect your personal data. Your information is stored on secure servers and protected against unauthorized access.</p>
                                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                                    <p className="m-0 text-amber-900 text-sm italic font-medium">
                                        However, no method of online transmission is 100% secure, and we cannot guarantee absolute security.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Sharing of Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">06.</span>
                                Sharing of Information
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed font-bold">We do NOT sell, trade, or rent your personal information.</p>
                                <p className="text-slate-800 leading-relaxed">We may share limited information with:</p>
                                <div className="grid grid-cols-1 gap-4 mt-6">
                                    {[
                                        "Payment gateway providers",
                                        "Shipping & logistics partners",
                                        "Legal or government authorities (if required by law)"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-lg border border-emerald-100/50">
                                            <Share2 className="w-5 h-5 text-[#1e5e3f] shrink-0" />
                                            <span className="text-sm font-semibold text-slate-800">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-[#b77f6b] mt-6">
                                    <p className="m-0 font-medium text-[#1c1917] italic">Information shared is strictly for service fulfillment.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Third-Party Services & Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">07.</span>
                                Third-Party Services & Links
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">Our website may contain links to third-party websites or services. We are not responsible for their content, privacy policies, or practices.</p>
                                <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-[#1e5e3f]">
                                    <p className="m-0 font-medium text-[#1c1917] italic">Please review their policies separately before sharing any information.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Your Rights */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">08.</span>
                                Your Rights
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">You have the right to:</p>
                                <div className="grid grid-cols-1 gap-4 mt-6">
                                    {[
                                        "Access your personal information",
                                        "Request correction or deletion",
                                        "Opt out of promotional communication"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-lg border border-emerald-100/50">
                                            <ShieldCheck className="w-5 h-5 text-[#1e5e3f] shrink-0" />
                                            <span className="text-sm font-semibold text-slate-800">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-[#b77f6b] mt-6">
                                    <p className="m-0 font-medium text-[#1c1917] italic">To exercise these rights, contact us using the details below.</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Changes to Privacy Policy */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl text-[#1c1917] font-serif font-bold flex items-center gap-3">
                                <span className="text-[#b77f6b] text-lg font-sans tabular-nums">09.</span>
                                Changes to This Privacy Policy
                            </h2>
                            <div className="mt-6 space-y-4">
                                <p className="text-slate-800 leading-relaxed">Arna Skincare reserves the right to update or modify this Privacy Policy at any time. Updates will be posted on this page with a revised date.</p>
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
                                If you have any questions regarding this Privacy Policy, contact us at:
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
                            <p className="text-slate-400 text-sm mb-4">By using arnaskincare.in, you agree to this Privacy Policy.</p>
                            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-100">
                                <span className="text-sm font-medium text-slate-600">Questions about your privacy?</span>
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