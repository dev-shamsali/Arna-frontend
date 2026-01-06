"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Leaf, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { categories, problems } from "../lib/constants"
import { getAllProducts } from '../lib/services/product.service';
import BestSellers from './BestSellers';
import ProductCard from './ProductsCard';
const ProductsPage = () => {
    const products = getAllProducts();
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeProblem, setActiveProblem] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Price filter state
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [isPriceExpanded, setIsPriceExpanded] = useState(true);

    const priceRangeOptions = [
        { id: 'under200', label: 'Under ₹200', min: 0, max: 200 },
        { id: '300-500', label: '₹300 - ₹500', min: 300, max: 500 },
        { id: '500-1000', label: '₹500 - ₹1000', min: 500, max: 1000 },
        { id: 'above1500', label: 'Above ₹1500', min: 1500, max: 10000 }
    ];

    const filteredProducts = useMemo(() => {
        let filtered = activeCategory === "all"
            ? products
            : products.filter(p => p.category === activeCategory);

        // Apply price filter
        if (selectedPriceRanges.length > 0) {
            filtered = filtered.filter(p => {
                return selectedPriceRanges.some(rangeId => {
                    const range = priceRangeOptions.find(r => r.id === rangeId);
                    return p.price >= range.min && p.price <= range.max;
                });
            });
        }

        return filtered;
    }, [activeCategory, selectedPriceRanges]);

    const bestSellers = useMemo(() => {
        return products.filter(p => p.bestseller);
    }, []);

    useEffect(() => {
        setVisibleCount(5);
    }, [activeCategory, selectedPriceRanges]);

    const togglePriceRange = (rangeId) => {
        setSelectedPriceRanges(prev =>
            prev.includes(rangeId)
                ? prev.filter(id => id !== rangeId)
                : [...prev, rangeId]
        );
    };

    const clearFilters = () => {
        setSelectedPriceRanges([]);
        setActiveCategory('all');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Header */}
            <section
                className="relative bg-cover bg-center bg-no-repeat py-16 md:py-24 px-4"
                style={{ backgroundImage: "url('/hero.png')" }}
            >
                <div className="absolute inset-0  backdrop-blur-sm"></div>

                <div className="relative max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full mb-6 shadow-sm">
                        <Leaf className="w-4 h-4 text-[#0A7A4E]" />
                        <span className="text-sm text-[#0A7A4E] font-medium">30 Premium Products Available</span>
                    </div>

                    <h1 className="font-serif text-4xl md:text-6xl text-[#0A7A4E] mb-4">
                        Discover ARNA Products
                    </h1>

                    <p className="text-lg md:text-xl text-black-700 max-w-2xl mx-auto font-light">
                        Pure, safe, effective skin & hair care
                    </p>

                    <div className="mt-8 flex justify-center">
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9A86A] to-transparent"></div>
                    </div>
                </div>
            </section>


            {/* Mobile Filter Toggle Button */}
            <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0A7A4E] text-white rounded-lg"
                >
                    <Menu className="w-5 h-5" />
                    <span className="font-medium">Filters</span>
                </button>
            </div>

            {/* Main Content Area with Sidebar */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Sidebar - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-4 space-y-6">
                            {/* Categories Section */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h3 className="font-semibold text-lg text-gray-800 mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${activeCategory === cat.id
                                                ? 'bg-[#0A7A4E] text-white shadow-md'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Filter Section */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                <button
                                    onClick={() => setIsPriceExpanded(!isPriceExpanded)}
                                    className="w-full flex items-center justify-between mb-4"
                                >
                                    <h3 className="font-semibold text-lg text-gray-800">Price Range</h3>
                                    {isPriceExpanded ? (
                                        <ChevronUp className="w-5 h-5 text-gray-600" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-600" />
                                    )}
                                </button>

                                {isPriceExpanded && (
                                    <div className="space-y-3">
                                        {priceRangeOptions.map((range) => (
                                            <label
                                                key={range.id}
                                                className="flex items-center gap-3 cursor-pointer group"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPriceRanges.includes(range.id)}
                                                    onChange={() => togglePriceRange(range.id)}
                                                    className="w-4 h-4 text-[#0A7A4E] rounded border-gray-300 focus:ring-[#0A7A4E]"
                                                />
                                                <span className="text-sm text-gray-700 group-hover:text-[#0A7A4E]">
                                                    {range.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Clear Filters */}
                            {(activeCategory !== 'all' || selectedPriceRanges.length > 0) && (
                                <button
                                    onClick={clearFilters}
                                    className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium cursor-pointer"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    </aside>

                    {/* Mobile Sidebar Overlay */}
                    {isSidebarOpen && (
                        <div className="lg:hidden fixed inset-0 z-50">
                            <div
                                className="absolute inset-0 bg-black/50"
                                onClick={() => setIsSidebarOpen(false)}
                            />
                            <div className="absolute left-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
                                <div className="p-6 space-y-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="font-semibold text-xl text-gray-800">Filters</h2>
                                        <button
                                            onClick={() => setIsSidebarOpen(false)}
                                            className="p-2 hover:bg-gray-100 rounded-lg"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Categories */}
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-800 mb-4">Categories</h3>
                                        <div className="space-y-2">
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => {
                                                        setActiveCategory(cat.id);
                                                        setIsSidebarOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${activeCategory === cat.id
                                                        ? 'bg-[#0A7A4E] text-white shadow-md'
                                                        : 'bg-gray-50 text-gray-700'
                                                        }`}
                                                >
                                                    {cat.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Filter */}
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-800 mb-4">Price Range</h3>
                                        <div className="space-y-3">
                                            {priceRangeOptions.map((range) => (
                                                <label
                                                    key={range.id}
                                                    className="flex items-center gap-3 cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedPriceRanges.includes(range.id)}
                                                        onChange={() => togglePriceRange(range.id)}
                                                        className="w-4 h-4 text-[#0A7A4E] rounded border-gray-300"
                                                    />
                                                    <span className="text-sm text-gray-700">{range.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Clear Filters */}
                                    {(activeCategory !== 'all' || selectedPriceRanges.length > 0) && (
                                        <button
                                            onClick={() => {
                                                clearFilters();
                                                setIsSidebarOpen(false);
                                            }}
                                            className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium"
                                        >
                                            Clear All Filters
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Products Grid */}
                    <div className="flex-1">
                        {/* Results Info */}
                        <div className="mb-6">
                            <p className="text-gray-600">
                                Showing <span className="font-semibold text-gray-800">{Math.min(visibleCount, filteredProducts.length)}</span> of{' '}
                                <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products
                            </p>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.slice(0, visibleCount).map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* No Results */}
                        {filteredProducts.length === 0 && (
                            <div className="text-center py-16">
                                <p className="text-xl text-gray-600">No products found matching your filters.</p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 px-6 py-3 bg-[#0A7A4E] text-white rounded-lg hover:bg-[#0A7A4E]/90 cursor-pointer"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}

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
                    </div>
                </div>
            </div>

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
        </div>
    );
};

export default ProductsPage;