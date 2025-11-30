"use client";
import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from "../products/ProductsCard"
import BestSellers from "../products/BestSellers";
import { categories, products, problems } from '../lib/constants';
import { Leaf } from 'lucide-react';
const ProductsPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeProblem, setActiveProblem] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5); // show 6 products at start
    const [isHydrated, setIsHydrated] = useState(false);

    const filteredProducts = useMemo(() => {
        return activeCategory === "all"
            ? products
            : products.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    const bestSellers = useMemo(() => {
        return products.filter(p => p.bestseller);
    }, []);

    useEffect(() => {
        setVisibleCount(5);
    }, [activeCategory]);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Header */}
            <section className="relative bg-gradient-to-b from-[#0A7A4E]/10 via-white to-white py-16 md:py-24 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full mb-6 shadow-sm">
                        <Leaf className="w-4 h-4 text-[#0A7A4E]" />
                        <span className="text-sm text-[#0A7A4E] font-medium">40 Premium Products Available</span>
                    </div>

                    <h1 className="font-serif text-4xl md:text-6xl text-[#0A7A4E] mb-4">
                        Discover ARNA Products
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
                        Pure, safe, effective skin & hair care
                    </p>

                    {/* Decorative element */}
                    <div className="mt-8 flex justify-center">
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9A86A] to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* Sticky Category Filter */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm mb-4">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 text-sm font-medium ${activeCategory === cat.id
                                    ? 'bg-[#0A7A4E] text-white shadow-lg shadow-[#0A7A4E]/20'
                                    : 'bg-white text-[#0A7A4E] border border-gray-200 hover:border-[#0A7A4E] hover:shadow-md'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {isHydrated &&
                    filteredProducts.slice(0, visibleCount).map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}


                </div>
                {/* Load More Button */}
                {visibleCount < filteredProducts.length && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => setVisibleCount(prev => prev + 6)}
                            className="px-6 py-3 rounded-full bg-[#0A7A4E] text-white font-medium
                   hover:bg-[#0A7A4E]/90 transition-all shadow-md cursor-pointer"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </section>

            {/* Best Sellers Strip */}
            <BestSellers bestSellers={bestSellers} />

            {/* Skincare Problem Finder */}
            <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                <div className="text-center mb-10">
                    <h2 className="font-serif text-3xl md:text-4xl text-[#0A7A4E] mb-4">
                        Find Solutions for Your Concerns
                    </h2>
                    <p className="text-gray-600">Select your skin or hair concern to discover the perfect products</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {problems.map((problem) => (
                        <button
                            key={problem.id}
                            onClick={() => setActiveProblem(problem.id)}
                            className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${activeProblem === problem.id
                                ? 'border-[#0A7A4E] bg-[#0A7A4E]/5 shadow-lg'
                                : 'border-gray-200 bg-white hover:border-[#0A7A4E]/50'
                                }`}
                        >
                            <div className="text-4xl mb-3">{problem.icon}</div>
                            <div className="text-sm font-medium text-gray-800">{problem.label}</div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0A7A4E] text-white py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8">
                        {/* About */}
                        <div>
                            <h3 className="font-serif text-2xl mb-4">ARNA</h3>
                            <p className="text-white/80 text-sm leading-relaxed">
                                Pure, safe, and effective skincare & haircare solutions inspired by Ayurveda and modern science.
                            </p>
                        </div>

                        {/* Shop Categories */}
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Shop Categories</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Skincare</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Haircare</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Best Sellers</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">New Arrivals</a></li>
                            </ul>
                        </div>

                        {/* Customer Support */}
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Customer Support</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">FAQs</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Shipping Info</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Returns</a></li>
                            </ul>
                        </div>

                        {/* Connect */}
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Connect With Us</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                                    <span className="text-lg">f</span>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                                    <span className="text-lg">in</span>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                                    <span className="text-lg">ig</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
                        <p>© 2024 ARNA. All rights reserved. | Made with nature's care 🌿</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ProductsPage;