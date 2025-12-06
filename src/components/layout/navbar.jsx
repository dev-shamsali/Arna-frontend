'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, User, Heart, ShoppingCart, ChevronDown } from 'lucide-react'

export default function Navbar({ solid = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpenMobile, setProductsOpenMobile] = useState(false)
  const mobileRef = useRef(null)
  const burgerRef = useRef(null)

  const showSolid = solid || scrolled

  // scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // close on outside click / escape
  useEffect(() => {
    const handleOutside = (e) => {
      if (
        mobileOpen &&
        mobileRef.current &&
        !mobileRef.current.contains(e.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target)
      ) {
        setMobileOpen(false)
      }
    }
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setProductsOpenMobile(false)
      }
    }
    document.addEventListener('click', handleOutside)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('click', handleOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [mobileOpen])

  // prevent body scroll when mobile menu open
  useEffect(() => {
    if (typeof window === 'undefined') return
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // toggles
  const toggleMobile = () => {
    setMobileOpen((v) => !v)
    if (mobileOpen) {
      // closing: also close nested
      setProductsOpenMobile(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        showSolid ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50">
            <span
              className={`text-2xl sm:text-3xl font-serif tracking-wider transition-colors duration-300 ${
                showSolid ? 'text-black' : 'text-white'
              }`}
            >
              ARNA
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            <Link
              href="/"
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                showSolid ? 'text-black' : 'text-white'
              }`}
            >
              HOME
            </Link>

            <Link
              href="/about"
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                showSolid ? 'text-black' : 'text-white'
              }`}
            >
              ABOUT US
            </Link>

            <Link
              href="/products"
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                showSolid ? 'text-black' : 'text-white'
              }`}
            >
              OUR PRODUCTS
            </Link>

            <Link
              href="/contact"
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                showSolid ? 'text-black' : 'text-white'
              }`}
            >
              CONTACT
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              className={`transition-colors duration-300 hover:opacity-70 ${
                showSolid ? 'text-black' : 'text-white'
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/signin"
              className={`transition-colors duration-300 hover:opacity-70 ${
                showSolid ? 'text-black' : 'text-white'
              }`}
              aria-label="Sign In"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              href="/wishlist"
              className={`transition-colors duration-300 hover:opacity-70 ${
                showSolid ? 'text-black' : 'text-white'
              }`}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <Link
              href="/cart"
              className={`transition-colors duration-300 hover:opacity-70 ${
                showSolid ? 'text-black' : 'text-white'
              }`}
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>

            {/* Mobile Burger */}
            <button
              ref={burgerRef}
              onClick={toggleMobile}
              aria-label="Menu"
              aria-expanded={mobileOpen}
              className={`md:hidden relative z-50 w-10 h-10 inline-flex items-center justify-center rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                showSolid ? 'text-black focus:ring-black/30' : 'text-white focus:ring-white/30'
              }`}
            >
              {/* Hamburger icon with smooth animation to X */}
              <span className="sr-only">Toggle menu</span>
              <div className="w-6 h-6 relative">
                <span
                  className={`block absolute left-0 top-0 w-6 h-0.5 transform transition duration-300 origin-center ${
                    mobileOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1.5'
                  }`}
                  style={{ backgroundColor: 'currentColor' }}
                />
                <span
                  className={`block absolute left-0 top-1/2 w-6 h-0.5 transform transition duration-300 origin-center ${
                    mobileOpen ? 'opacity-0' : 'translate-y-0 -translate-y-1/2'
                  }`}
                  style={{ backgroundColor: 'currentColor' }}
                />
                <span
                  className={`block absolute left-0 bottom-0 w-6 h-0.5 transform transition duration-300 origin-center ${
                    mobileOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1.5'
                  }`}
                  style={{ backgroundColor: 'currentColor' }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel (slide down) */}
      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 pointer-events-none ${
          mobileOpen ? 'opacity-40 bg-black/40 pointer-events-auto' : 'opacity-0'
        }`}
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      />

      <div
        ref={mobileRef}
        className={`md:hidden fixed top-16 left-0 right-0 z-50 overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          mobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`bg-white shadow-lg rounded-b-lg mx-4 sm:mx-6 p-4 transform transition-transform duration-300 ${
            mobileOpen ? 'translate-y-0' : '-translate-y-2'
          }`}
        >
          {/* Mobile Links */}
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-sm font-medium text-gray-900 hover:opacity-80"
            >
              HOME
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-sm font-medium text-gray-900 hover:opacity-80"
            >
              ABOUT US
            </Link>

            {/* Products with nested menu */}
            <div>
              <button
                onClick={() => setProductsOpenMobile((v) => !v)}
                aria-expanded={productsOpenMobile}
                className="w-full flex items-center justify-between py-2 text-sm font-medium text-gray-900 hover:opacity-80"
              >
                <span>OUR PRODUCTS</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    productsOpenMobile ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                  productsOpenMobile ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-3 mt-1 flex flex-col gap-1">
                  <Link href="/products/skincare" onClick={() => setMobileOpen(false)} className="py-1 text-sm text-gray-700">
                    Skincare
                  </Link>
                  <Link href="/products/hair" onClick={() => setMobileOpen(false)} className="py-1 text-sm text-gray-700">
                    Haircare
                  </Link>
                  <Link href="/products/body" onClick={() => setMobileOpen(false)} className="py-1 text-sm text-gray-700">
                    Body
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-sm font-medium text-gray-900 hover:opacity-80"
            >
              CONTACT
            </Link>

            {/* CTA Icons in mobile menu */}
            <div className="mt-3 flex items-center gap-4">
              <Link href="/signin" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4" /> Sign in
              </Link>
              <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm">
                <Heart className="w-4 h-4" /> Wishlist
              </Link>
              <Link href="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm">
                <ShoppingCart className="w-4 h-4" /> Cart
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  )
}
