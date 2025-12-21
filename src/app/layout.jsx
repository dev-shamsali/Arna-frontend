import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";

import { CartProvider } from "@/components/cart/CartContext";
import Footer from "@/components/layout/footer";

/* Fonts */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

/* Metadata (SEO + Favicons) */
export const metadata = {
  title: {
    default: "Arna Skin Care — Refined Rituals",
    template: "%s | Arna Skin Care",
  },
  description:
    "Luxury skincare designed for healthy, glowing, timeless skin.",
  themeColor: "#ffffff",
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
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
