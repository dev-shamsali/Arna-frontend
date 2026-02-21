import './globals.css'
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import ConditionalNavbar from '@/components/layout/ConditionalNavbar'
import { CartProvider } from '@/components/cart/CartContext'
import { WishlistProvider } from '@/components/wishlist/WishlistContext' // ← Add this
// import Footer from '@/components/layout/footer'
import IntroGate from '@/components/ui/IntroGate'
import ReduxProvider from '@/redux/provider'
import Script from "next/script";

/* Fonts */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  italic: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

/* Metadata — SERVER ONLY */
export const metadata = {
  title: {
    default: 'Arna Skin Care — Herbal, Pure & Chemical-Free Skincare',
    template: '%s | Arna Skin Care',
  },
  description:
    'Premium herbal skincare crafted with natural ingredients — safe, chemical-free formulations designed for glowing, healthy skin.',
  themeColor: '#ffffff',
  icons: {
    shortcut: '/favicon_io/ARN%20Fav%20Icon.webp',
    apple: '/favicon_io/apple-touch-icon.png?v=2',
    icon: [
      { url: '/favicon_io/ARN%20Fav%20Icon.webp', sizes: 'any', type: 'image/webp' },
    ],
  },
  openGraph: {
    type: 'website',
    url: 'https://arnaskincare.in',
    title: 'Arna Skin Care — Refined Rituals',
    description:
      'Luxury herbal skincare designed for healthy, glowing, timeless skin.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arna Skin Care',
    description: 'Pure, herbal and chemical-free skincare that truly works.',
    images: ['/og-image.png'],
  },
  manifest: '/favicon_io/site.webmanifest',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/logo1.png"
          type="image/png"
          fetchPriority="high"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Arna Skin Care',
              url: 'https://arnaskincare.in',
              logo: 'https://arnaskincare.in/logo.png',
            }),
          }}
        />
      </head>

      <body className="antialiased min-h-screen flex flex-col">
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
        <ReduxProvider>
          <IntroGate>
            <CartProvider>
              <WishlistProvider> {/* ← Add this wrapper */}
                <ConditionalNavbar />
                <main className="flex-1">{children}</main>
                {/* <Footer /> */}
              </WishlistProvider> {/* ← Close here */}
            </CartProvider>
          </IntroGate>
        </ReduxProvider>
      </body>
    </html>
  )
}
