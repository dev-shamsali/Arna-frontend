'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, User, Heart, ShoppingCart, ChevronDown, X, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useCart } from '@/components/cart/CartContext'
import Image from 'next/image'

export default function Navbar({ solid = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpenMobile, setProductsOpenMobile] = useState(false)
  const [productsOpenDesktop, setProductsOpenDesktop] = useState(false)
  const mobileRef = useRef(null)
  const burgerRef = useRef(null)
  const desktopProductsRef = useRef(null)

  const pathname = usePathname()
  const { cartItems } = useCart()

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)

  const isProductSlug =
    pathname.startsWith("/products/") && pathname.split("/").length === 3
  const onCartPage = pathname === '/cart'
  const showSolid = onCartPage || isProductSlug || scrolled

  // Product categories
  const productCategories = [
    { name: 'Skincare', href: '/products/skincare' },
    { name: 'Haircare', href: '/products/hair' },
    { name: 'Body Care', href: '/products/body' },
  ]

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close on outside click / escape
  useEffect(() => {
    const handleOutside = (e) => {
      // Mobile menu
      if (
        mobileOpen &&
        mobileRef.current &&
        !mobileRef.current.contains(e.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target)
      ) {
        setMobileOpen(false)
        setProductsOpenMobile(false)
      }
      
      // Desktop dropdown
      if (
        productsOpenDesktop &&
        desktopProductsRef.current &&
        !desktopProductsRef.current.contains(e.target)
      ) {
        setProductsOpenDesktop(false)
      }
    }
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setProductsOpenMobile(false)
        setProductsOpenDesktop(false)
      }
    }
    
    document.addEventListener('click', handleOutside)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('click', handleOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [mobileOpen, productsOpenDesktop])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (typeof window === 'undefined') return
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const toggleMobile = () => {
    setMobileOpen((v) => !v)
    if (mobileOpen) {
      setProductsOpenMobile(false)
    }
  }

  const closeMobileMenu = () => {
    setMobileOpen(false)
    setProductsOpenMobile(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        showSolid ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Responsive sizing */}
          <Link href="/" className="flex items-center z-50 flex-shrink-0" onClick={closeMobileMenu}>
            {/* Replace with your actual logo image */}
            {/* <Image 
              src="/logo.png" 
              alt="ARNA Logo" 
              width={120} 
              height={40}
              className={`h-8 sm:h-10 w-auto transition-all duration-300 ${
                showSolid ? 'brightness-100' : 'brightness-0 invert'
              }`}
            /> */}
            
            {/* Text logo fallback */}
            <span
              className={`text-xl sm:text-2xl md:text-3xl font-serif tracking-wider transition-colors duration-300 ${
                showSolid ? 'text-black' : 'text-white'
              }`}
            >
              ARNA
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
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

            {/* Desktop Products Dropdown */}
            <div className="relative" ref={desktopProductsRef}>
              <button
                onClick={() => setProductsOpenDesktop((v) => !v)}
                onMouseEnter={() => setProductsOpenDesktop(true)}
                aria-expanded={productsOpenDesktop}
                aria-haspopup="true"
                className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                  showSolid ? 'text-black' : 'text-white'
                }`}
              >
                OUR PRODUCTS
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    productsOpenDesktop ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              {/* Desktop Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${
                  productsOpenDesktop
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                }`}
                onMouseLeave={() => setProductsOpenDesktop(false)}
                role="menu"
              >
                {productCategories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    onClick={() => setProductsOpenDesktop(false)}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-150"
                    role="menuitem"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

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
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              className={`hidden sm:block transition-colors duration-300 hover:opacity-70 ${
                showSolid ? 'text-black' : 'text-white'
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/signin"
              className={`hidden sm:block transition-colors duration-300 hover:opacity-70 ${
                showSolid ? 'text-black' : 'text-white'
              }`}
              aria-label="Sign In"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              href="/wishlist"
              className={`hidden sm:block transition-colors duration-300 hover:opacity-70 ${
                showSolid ? 'text-black' : 'text-white'
              }`}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Cart with Badge */}
            <Link
              href="/cart"
              className={`relative transition-colors duration-300 hover:opacity-70 ${
                showSolid ? 'text-black' : 'text-white'
              }`}
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-emerald-600 text-white text-[10px] font-semibold px-1 shadow-md">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Enhanced Mobile Burger */}
            <button
              ref={burgerRef}
              onClick={toggleMobile}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className={`md:hidden relative z-50 p-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                showSolid
                  ? 'text-black hover:bg-gray-100 focus:ring-gray-300'
                  : 'text-white hover:bg-white/10 focus:ring-white/30'
              }`}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Side Panel */}
      <div
        ref={mobileRef}
        className={`md:hidden fixed top-0 right-0 bottom-0 z-50 w-[280px] sm:w-[320px] bg-white shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="p-6">
          {/* Mobile Logo & Close */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" onClick={closeMobileMenu} className="flex items-center">
              <span className="text-2xl font-serif tracking-wider text-black">
                ARNA
              </span>
            </Link>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="py-3 px-4 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              HOME
            </Link>

            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="py-3 px-4 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              ABOUT US
            </Link>

            {/* Mobile Products Accordion */}
            <div className="overflow-hidden">
              <button
                onClick={() => setProductsOpenMobile((v) => !v)}
                aria-expanded={productsOpenMobile}
                className="w-full flex items-center justify-between py-3 px-4 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                <span>OUR PRODUCTS</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    productsOpenMobile ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              <div
                className={`ml-4 overflow-hidden transition-all duration-300 ${
                  productsOpenMobile ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="flex flex-col gap-1 pt-1">
                  {productCategories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      onClick={closeMobileMenu}
                      className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-700 rounded-md transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="py-3 px-4 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              CONTACT
            </Link>
          </nav>

          {/* Mobile Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              <Link
                href="/search"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </Link>
              
              <Link
                href="/signin"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
              
              <Link
                href="/wishlist"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </Link>
              
              <Link
                href="/cart"
                onClick={closeMobileMenu}
                className="flex items-center justify-between py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                </div>
                {cartCount > 0 && (
                  <span className="px-2 py-1 rounded-full bg-emerald-600 text-white text-xs font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
