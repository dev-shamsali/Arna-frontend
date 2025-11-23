    'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, User, Heart, ShoppingCart, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [productsDropdown, setProductsDropdown] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = () => setProductsDropdown(false)
    if (productsDropdown) {
      document.addEventListener('click', closeDropdown)
      return () => document.removeEventListener('click', closeDropdown)
    }
  }, [productsDropdown])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span
              className={`text-2xl sm:text-3xl font-serif tracking-wider transition-colors duration-300 ${
                scrolled ? 'text-black' : 'text-white'
              }`}
            >
              ARNA
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            <Link
              href="/"
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                scrolled ? 'text-black' : 'text-white'
              }`}
            >
              HOME
            </Link>

            <Link
              href="/about"
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                scrolled ? 'text-black' : 'text-white'
              }`}
            >
              ABOUT US
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative"
              onClick={(e) => {
                e.stopPropagation()
                setProductsDropdown(!productsDropdown)
              }}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                  scrolled ? 'text-black' : 'text-white'
                }`}
              >
                PRODUCTS
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    productsDropdown ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {productsDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/products/facewash"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Face Wash
                  </Link>
                  <Link
                    href="/products/shampoo"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Shampoo
                  </Link>
                  <Link
                    href="/products/moisturizer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Moisturizer
                  </Link>
                  <Link
                    href="/products/serum"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Serum
                  </Link>
                  <Link
                    href="/products/sunscreen"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Sunscreen
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                scrolled ? 'text-black' : 'text-white'
              }`}
            >
              CONTACT
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search Icon */}
            <button
              className={`transition-colors duration-300 hover:opacity-70 ${
                scrolled ? 'text-black' : 'text-white'
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Icon (Sign In) */}
            <Link
              href="/signin"
              className={`transition-colors duration-300 hover:opacity-70 ${
                scrolled ? 'text-black' : 'text-white'
              }`}
              aria-label="Sign In"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className={`transition-colors duration-300 hover:opacity-70 ${
                scrolled ? 'text-black' : 'text-white'
              }`}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className={`transition-colors duration-300 hover:opacity-70 ${
                scrolled ? 'text-black' : 'text-white'
              }`}
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden transition-colors duration-300 ${
                scrolled ? 'text-black' : 'text-white'
              }`}
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
