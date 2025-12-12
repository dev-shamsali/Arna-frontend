import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
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

export const metadata = {
  title: "Arna Skin Care — Refined Rituals",
  description: "Luxury skincare designed for healthy, glowing, timeless skin.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <Navbar />
         <main className="flex-1">
          {children}
        </main>
        <Footer />  

      </body>
    </html>
  );
}
