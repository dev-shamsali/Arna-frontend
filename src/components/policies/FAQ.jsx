'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronDown, Leaf, Package, RefreshCcw, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function FAQContent() {
    const [openIndex, setOpenIndex] = useState(null)

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    const faqs = [
        {
            question: "Are Arna Skincare products herbal?",
            answer: "Yes. Arna Skincare products are made using herbal and plant-based ingredients inspired by traditional skincare practices.",
            category: "products"
        },
        {
            question: "Are your products safe for all skin types?",
            answer: "Our products are formulated to suit most skin types. However, every skin is different. We strongly recommend performing a patch test before regular use.",
            category: "products"
        },
        {
            question: "Do you use chemicals or parabens?",
            answer: "Arna Skincare focuses on herbal formulations. We avoid harsh chemicals wherever possible. Please refer to the ingredient list on each product page for complete details.",
            category: "products"
        },
        {
            question: "How do I perform a patch test?",
            answer: "Apply a small amount of the product on your inner arm or behind the ear. Wait for 24 hours. If no irritation occurs, the product is safe to use.",
            category: "usage"
        },
        {
            question: "How long does it take to see results?",
            answer: "Results may vary based on skin type, concern, and usage. Herbal products usually take consistent use to show visible results.",
            category: "usage"
        },
        {
            question: "Do you ship across India?",
            answer: "Yes, we currently ship across India.",
            category: "shipping"
        },
        {
            question: "How long will delivery take?",
            answer: "Orders are usually delivered within 3–7 business days depending on your location.",
            category: "shipping"
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is shipped, you will receive a tracking link via SMS or email.",
            category: "shipping"
        },
        {
            question: "Can I cancel my order?",
            answer: "Orders can be cancelled only before they are shipped. Once dispatched, cancellation is not possible.",
            category: "returns"
        },
        {
            question: "Do you accept returns or refunds?",
            answer: "Due to hygiene reasons, opened or used skincare products are not eligible for return. Returns or refunds are accepted only for damaged, wrong, or missing products. Please refer to our Refund Policy for detailed information.",
            category: "returns"
        },
        {
            question: "What if I receive a damaged product?",
            answer: "Please contact us within 48 hours of delivery with an unboxing video or clear images at support@arnaskincare.in.",
            category: "returns"
        },
        {
            question: "Are your products tested on animals?",
            answer: "No. Arna Skincare does not support animal testing.",
            category: "products"
        },
        {
            question: "How can I contact customer support?",
            answer: "You can contact us at:\nEmail: support@arnaskincare.in\nWebsite: https://arnaskincare.in",
            category: "support"
        }
    ]

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
                            <span className="text-white">Frequently Asked Questions</span>
                        </nav>
                        <h1 className="font-serif text-4xl md:text-6xl text-white font-bold mb-6">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                            Find answers to common questions about Arna Skincare products, shipping, returns, and more. Can't find what you're looking for? Contact our support team.
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

                    {/* Quick Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
                        <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#1e5e3f]/10 flex items-center justify-center mx-auto mb-4 text-[#1e5e3f]">
                                <Leaf className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#1c1917] mb-2">Products</h3>
                            <p className="text-slate-600 text-sm font-normal">Herbal ingredients & safety</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#b77f6b]/10 flex items-center justify-center mx-auto mb-4 text-[#b77f6b]">
                                <Package className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#1c1917] mb-2">Shipping</h3>
                            <p className="text-slate-600 text-sm font-normal">Delivery & tracking</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#c5a059]/10 flex items-center justify-center mx-auto mb-4 text-[#c5a059]">
                                <RefreshCcw className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#1c1917] mb-2">Returns</h3>
                            <p className="text-slate-600 text-sm font-normal">Refunds & cancellations</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-stone-50 border border-stone-100 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#1e5e3f]/10 flex items-center justify-center mx-auto mb-4 text-[#1e5e3f]">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-[#1c1917] mb-2">Support</h3>
                            <p className="text-slate-600 text-sm font-normal">Contact & help</p>
                        </div>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="space-y-4 max-w-none">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="border border-stone-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full p-6 flex items-center justify-between gap-4 text-left hover:bg-stone-50 transition-colors"
                                >
                                    <div className="flex items-start gap-4 flex-1">
                                        <span className="text-[#b77f6b] text-lg font-sans tabular-nums font-bold shrink-0 mt-1">
                                            {String(index + 1).padStart(2, '0')}.
                                        </span>
                                        <h3 className="text-lg md:text-xl font-serif font-bold text-[#1c1917]">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="shrink-0"
                                    >
                                        <ChevronDown className="w-6 h-6 text-[#1e5e3f]" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pl-[4.5rem]">
                                                <div className="border-t border-stone-200 pt-4">
                                                    <p className="text-slate-800 leading-relaxed whitespace-pre-line">
                                                        {faq.answer}
                                                    </p>
                                                    {faq.category === "returns" && index === 9 && (
                                                        <Link href="/refund-policy" className="inline-block mt-3 text-[#b77f6b] font-semibold underline hover:text-[#1e5e3f] transition-colors">
                                                            View Refund Policy →
                                                        </Link>
                                                    )}
                                                    {faq.category === "support" && index === 12 && (
                                                        <div className="mt-4 space-y-2">
                                                            <a href="mailto:support@arnaskincare.in" className="block text-[#b77f6b] font-semibold underline hover:text-[#1e5e3f] transition-colors">
                                                                support@arnaskincare.in
                                                            </a>
                                                            <a href="https://arnaskincare.in" className="block text-[#b77f6b] font-semibold underline hover:text-[#1e5e3f] transition-colors">
                                                                https://arnaskincare.in
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    {/* Still Have Questions Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 p-8 rounded-[2rem] bg-slate-900 text-white"
                    >
                        <h2 className="text-white text-xl md:text-2xl mb-6 font-serif font-bold text-center">Still Have Questions?</h2>
                        <p className="text-white/70 font-light leading-relaxed mb-6 text-center max-w-2xl mx-auto">
                            Our customer support team is here to help. Whether you have questions about our herbal products, your order, or anything else, we're just an email away.
                        </p>
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 max-w-xl mx-auto">
                            <AlertCircle className="w-5 h-5 text-[#b77f6b] shrink-0" />
                            <p className="m-0 text-sm text-white/80">
                                Email us at <a href="mailto:support@arnaskincare.in" className="text-[#b77f6b] underline font-semibold">support@arnaskincare.in</a>
                            </p>
                        </div>
                    </motion.div>

                    {/* Quick Links to Other Policies */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/refund-policy" className="p-6 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                            <h3 className="font-bold text-[#1c1917] mb-2 group-hover:text-[#1e5e3f] transition-colors">Refund Policy</h3>
                            <p className="text-slate-600 text-sm font-normal">Learn about our return and refund process</p>
                        </Link>
                        <Link href="/terms-conditions" className="p-6 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                            <h3 className="font-bold text-[#1c1917] mb-2 group-hover:text-[#1e5e3f] transition-colors">Terms & Conditions</h3>
                            <p className="text-slate-600 text-sm font-normal">Review our terms of service</p>
                        </Link>
                        <Link href="/privacy-policy" className="p-6 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                            <h3 className="font-bold text-[#1c1917] mb-2 group-hover:text-[#1e5e3f] transition-colors">Privacy Policy</h3>
                            <p className="text-slate-600 text-sm font-normal">See how we protect your data</p>
                        </Link>
                    </div>

                    {/* Agreement */}
                    <div className="text-center pt-12">
                        <p className="text-slate-400 text-sm">By using arnaskincare.in, you agree to our policies and terms.</p>
                    </div>

                </div>
            </section>
        </div>
    )
}