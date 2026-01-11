import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import { CartProvider } from "@/components/cart/CartContext";
import Footer from "@/components/layout/footer";

/* Fonts — reduced weights for better performance */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

/* Metadata (SEO + Favicons) */
export const metadata = {
  title: {
    default: "Arna Skin Care — Herbal, Pure & Chemical-Free Skincare",
    template: "%s | Arna Skin Care",
  },
  description:
    "Premium herbal skincare crafted with natural ingredients — safe, chemical-free formulations designed for glowing, healthy skin.",
  themeColor: "#ffffff",

  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png" },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    url: "https://arnaskincare.in",
    title: "Arna Skin Care — Refined Rituals",
    description:
      "Luxury herbal skincare designed for healthy, glowing, timeless skin.",
    images: ["/og-image.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Arna Skin Care",
    description: "Pure, herbal and chemical-free skincare that truly works.",
    images: ["/og-image.png"],
  },

  manifest: "/favicon_io/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* 🔥 CRITICAL: Preload intro logo (PNG, max priority) */}
        <link
          rel="preload"
          as="image"
          href="/logo1.png"
          type="image/png"
          fetchpriority="high"
        />

        {/* Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Arna Skin Care",
              url: "https://arnaskincare.in",
              logo: "https://arnaskincare.in/logo.png",
            }),
          }}
        />

        {/* Website schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Arna Skin Care",
              url: "https://arnaskincare.in",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://arnaskincare.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>

      <body className="antialiased min-h-screen flex flex-col">
        <CartProvider>
          <ConditionalNavbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
