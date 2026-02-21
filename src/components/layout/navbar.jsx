'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, User, Heart, ShoppingCart, X, Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCart } from '@/components/cart/CartContext'
import Image from 'next/image'
import { useGetMeQuery } from '@/redux/slices/authApislice'

export default function Navbar({ solid = false }) {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ""

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(initialSearch)

  // Sync searchQuery with URL
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || "")
  }, [searchParams])

  // Typewriter effect states
  const [placeholder, setPlaceholder] = useState("");
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const suggestions = [
    "Search for pure botanicals...",
    "Search for organic serums...",
    "Search for face washes...",
    "Search for artisanal soaps...",
    "Search for hair care..."
  ];

  useEffect(() => {
    const suggestion = suggestions[suggestionIndex];
    const timeout = isDeleting ? 50 : 150;

    const handleTypewriter = () => {
      if (!isDeleting) {
        setPlaceholder(suggestion.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);

        if (charIndex === suggestion.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setPlaceholder(suggestion.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setSuggestionIndex(prev => (prev + 1) % suggestions.length);
        }
      }
    };

    const timer = setTimeout(handleTypewriter, timeout);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, suggestionIndex]);

  const mobileRef = useRef(null)
  const burgerRef = useRef(null)
  const searchInputRef = useRef(null)
  const router = useRouter()
  const { data: user, isLoading } = useGetMeQuery();

  const pathname = usePathname()

  // Auto-focus search on products page
  useEffect(() => {
    if (pathname === '/products') {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [pathname])
  const { cartItems } = useCart()


  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)


  const isProductSlug =
    pathname.startsWith("/products/") && pathname.split("/").length === 3
  const onCartPage = pathname === '/cart'
  const showSolid = solid || scrolled || onCartPage || isProductSlug



  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  // Close on outside click / escape
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
      }
    }


    document.addEventListener('click', handleOutside)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('click', handleOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [mobileOpen])


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
  }


  const closeMobileMenu = () => {
    setMobileOpen(false)
  }


  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${showSolid
        ? 'bg-white shadow-md'
        : 'bg-transparent'
        }`}
    >
      {/* Subtle gradient edges - left and right */}
      {showSolid && (
        <>
          {/* Left gradient edge */}
          <div className="absolute left-0 top-0 bottom-0 w-34 bg-gradient-to-r from-[#b77f6b]/20 via-[#2d2421]/10 to-transparent pointer-events-none" />


          {/* Right gradient edge */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#b77f6b]/20 via-[#2d2421]/10 to-transparent pointer-events-none" />
        </>
      )}


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo - Responsive sizing */}
          <Link href="/" className="flex items-center z-50 flex-shrink-0" onClick={closeMobileMenu}>
            <Image
              src="/logo1.png"
              alt="Arna"
              width={120}
              height={40}
              className="h-8 sm:h-9 transition-all duration-300 brightness-100"
            />
          </Link>


          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${showSolid ? 'text-gray-800' : 'text-white'
                }`}
            >
              HOME
            </Link>


            <Link
              href="/about"
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${showSolid ? 'text-gray-800' : 'text-white'
                }`}
            >
              ABOUT US
            </Link>


            {/* Products Link - Now clickable without dropdown */}
            <Link
              href="/products"
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${showSolid ? 'text-gray-800' : 'text-white'
                }`}
            >
              OUR PRODUCTS
            </Link>


            <Link
              href="/contact"
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${showSolid ? 'text-gray-800' : 'text-white'
                }`}
            >
              CONTACT
            </Link>
          </div>


          {/* Search Bar - Center/Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8 transition-all duration-300">
            <div className="relative w-full group">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim()) {
                    router.push(`/products?search=${encodeURIComponent(e.target.value)}`);
                  } else {
                    router.push('/products');
                  }
                }}
                onClick={() => {
                  if (pathname !== '/products') {
                    router.push('/products');
                  }
                }}
                placeholder={placeholder}
                className={`w-full py-2.5 px-10 rounded-full text-sm transition-all duration-300 border outline-none focus:ring-2 focus:ring-[#b77f6b]/50 ${showSolid
                  ? 'bg-gray-100 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#b77f6b]/30'
                  : 'bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-md focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-400 focus:border-white'
                  }`}
              />
              <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${showSolid ? 'text-gray-400' : 'text-white/60 group-focus-within:text-gray-400'}`} />
              {/* Simulated blinking cursor for placeholder */}
              {!searchQuery && (
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className={`absolute pointer-events-none top-1/2 -translate-y-1/2 h-4 w-[1px] ${showSolid ? 'bg-gray-400' : 'bg-white/60 group-focus-within:bg-gray-400'
                    }`}
                  style={{ left: `calc(40px + ${placeholder.length * 7.5}px)` }}
                />
              )}
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                if (user) {
                  router.push('/profile')
                } else {
                  router.push('/login')
                }
              }}
              className={`hidden sm:block transition-colors duration-300 hover:opacity-70 ${showSolid ? 'text-gray-800' : 'text-white'
                }`}
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </button>



            <Link
              href="/wishlist"
              className={`hidden sm:block transition-colors duration-300 hover:opacity-70 ${showSolid ? 'text-gray-800' : 'text-white'
                }`}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>


            {/* Cart with Badge */}
            <Link
              href="/cart"
              className={`relative transition-colors duration-300 hover:opacity-70 ${showSolid ? 'text-gray-800' : 'text-white'
                }`}
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#b77f6b] text-white text-[10px] font-semibold px-1 shadow-md">
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
              className={`md:hidden relative z-50 p-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${showSolid
                ? 'text-gray-800 hover:bg-gray-100 focus:ring-gray-300'
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

        {/* Mobile Search Bar - Visible only on mobile/tablet */}
        <div className="lg:hidden pb-5 px-4 max-w-2xl mx-auto">
          <div className="relative w-full group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim()) {
                  router.push(`/products?search=${encodeURIComponent(e.target.value)}`);
                } else {
                  router.push('/products');
                }
              }}
              onClick={() => {
                if (pathname !== '/products') {
                  router.push('/products');
                }
              }}
              placeholder={placeholder}
              className={`w-full py-3 px-11 rounded-full text-sm transition-all duration-300 border outline-none shadow-sm focus:ring-2 focus:ring-[#b77f6b]/50 ${showSolid
                ? 'bg-gray-100 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#b77f6b]/30'
                : 'bg-black/20 border-white/30 text-white placeholder:text-white/70 backdrop-blur-xl focus:bg-black/30 focus:border-white/50'
                }`}
            />
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${showSolid ? 'text-gray-400' : 'text-white/80 group-focus-within:text-white'}`} />
            {/* Simulated blinking cursor for placeholder */}
            {!searchQuery && (
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className={`absolute pointer-events-none top-1/2 -translate-y-1/2 h-4 w-[1px] ${showSolid ? 'bg-gray-400' : 'bg-white/80 group-focus-within:bg-white'
                  }`}
                style={{ left: `calc(44px + ${placeholder.length * 7.5}px)` }}
              />
            )}
          </div>
        </div>
      </div>


      {/* Mobile Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      />


      {/* Mobile Side Panel */}
      <div
        ref={mobileRef}
        className={`md:hidden fixed top-0 right-0 bottom-0 z-50 w-[280px] sm:w-[320px] bg-white shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto ${mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        aria-hidden={!mobileOpen}
      >
        {/* Gradient border effect for mobile menu */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#b77f6b] via-[#d1a394] to-[#b77f6b]" />


        <div className="p-6">
          {/* Mobile Logo & Close */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" onClick={closeMobileMenu} className="flex items-center">
              <span className="text-2xl font-serif tracking-wider text-gray-800">
                ARNA
              </span>
            </Link>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-800"
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
              className="py-3 px-4 text-sm font-medium text-gray-800 hover:bg-[#b77f6b]/5 rounded-md transition-colors"
            >
              HOME
            </Link>


            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="py-3 px-4 text-sm font-medium text-gray-800 hover:bg-[#b77f6b]/5 rounded-md transition-colors"
            >
              ABOUT US
            </Link>


            {/* Products Link - Direct link without accordion */}
            <Link
              href="/products"
              onClick={closeMobileMenu}
              className="py-3 px-4 text-sm font-medium text-gray-800 hover:bg-[#b77f6b]/5 rounded-md transition-colors"
            >
              OUR PRODUCTS
            </Link>


            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="py-3 px-4 text-sm font-medium text-gray-800 hover:bg-[#b77f6b]/5 rounded-md transition-colors"
            >
              CONTACT
            </Link>
          </nav>


          {/* Mobile Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              <Link
                href="/products"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 py-2 px-4 text-sm text-gray-800 hover:bg-[#006A4E]/5 rounded-md transition-colors"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </Link>


              <button
                onClick={() => {
                  if (user) {
                    router.push('/profile')
                  } else {
                    router.push('/login')
                  }
                }}

                className="flex items-center gap-3 py-2 px-4 text-sm text-gray-800 hover:bg-[#006A4E]/5 rounded-md transition-colors w-full text-left"
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>



              <Link
                href="/wishlist"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 py-2 px-4 text-sm text-gray-800 hover:bg-[#006A4E]/5 rounded-md transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </Link>


              <Link
                href="/cart"
                onClick={closeMobileMenu}
                className="flex items-center justify-between py-2 px-4 text-sm text-gray-800 hover:bg-[#b77f6b]/5 rounded-md transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                </div>
                {cartCount > 0 && (
                  <span className="px-2 py-1 rounded-full bg-[#b77f6b] text-white text-xs font-semibold">
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
