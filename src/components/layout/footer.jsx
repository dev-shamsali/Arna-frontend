"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const [whatsappHovered, setWhatsappHovered] = useState(false);

  return (
    <>
      {/* Sticky WhatsApp Button */}
      <motion.a
        href="https://wa.me/918850925827"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[9999]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        onMouseEnter={() => setWhatsappHovered(true)}
        onMouseLeave={() => setWhatsappHovered(false)}
      >
        <div className="relative">
          {/* Pulse */}
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75 z-0" />

          <motion.div
            className="relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg hover:shadow-2xl flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </motion.div>

          {whatsappHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg z-20"
            >
              Chat with us on WhatsApp
            </motion.div>
          )}
        </div>
      </motion.a>

      {/* Footer */}
      <footer className="relative w-full overflow-hidden bg-black">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-emerald-950 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-emerald-950/70" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(16,185,129,0.18), transparent 55%),
              radial-gradient(circle at 80% 70%, rgba(5,150,105,0.22), transparent 55%)
            `,
          }}
        />

        <div className="relative z-10 text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Main Footer Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">

              {/* Brand */}
              <div>
                <h3 className="font-serif text-2xl mb-4">ARNA</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Pure, safe, and effective skincare & haircare solutions inspired by Ayurveda and modern science.
                </p>
              </div>

              {/* Shop */}
              <div>
                <h4 className="font-semibold text-lg mb-4">Shop Categories</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/products?category=skincare" className="text-white/80 hover:text-emerald-300">• Skincare</a></li>
                  <li><a href="/products?category=haircare" className="text-white/80 hover:text-emerald-300">• Haircare</a></li>
                  <li><a href="/products?filter=bestsellers" className="text-white/80 hover:text-emerald-300">• Best Sellers</a></li>
                  <li><a href="/products?filter=new" className="text-white/80 hover:text-emerald-300">• New Arrivals</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold text-lg mb-4">Customer Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/contact" className="text-white/80 hover:text-emerald-300">• Contact Us</a></li>
                  <li><a href="/faq" className="text-white/80 hover:text-emerald-300">• FAQs</a></li>
                  <li><a href="/shipping" className="text-white/80 hover:text-emerald-300">• Shipping Info</a></li>
                  <li><a href="/returns" className="text-white/80 hover:text-emerald-300">• Returns</a></li>
                </ul>
              </div>

              {/* Connect */}
              <div>
                <h4 className="font-semibold text-lg mb-4">Connect With Us</h4>

                {/* Social Icons */}
                <div className="flex gap-4 mb-6">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500 flex items-center justify-center transition-all"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500 flex items-center justify-center transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500 flex items-center justify-center transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>

                <p className="text-xs text-white/60 mb-2">Contact us:</p>
                <a
                  href="tel:+918850925827"
                  className="text-sm text-emerald-300 hover:text-white font-medium"
                >
                  +91 8850925827
                </a>
              </div>
            </div>

            {/* Policies */}
            <div className="border-t border-white/10 pt-6 pb-6">
              <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm">
                <a href="/privacy-policy" className="text-white/70 hover:text-emerald-300">Privacy Policy</a>
                <span className="text-white/30">|</span>
                <a href="/terms-conditions" className="text-white/70 hover:text-emerald-300">Terms & Conditions</a>
                <span className="text-white/30">|</span>
                <a href="/refund-policy" className="text-white/70 hover:text-emerald-300">Refund Policy</a>
                <span className="text-white/30">|</span>
                <a href="/shipping-policy" className="text-white/70 hover:text-emerald-300">Shipping Policy</a>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/10 pt-6 text-center text-sm text-white/60">
              © 2024 ARNA. All rights reserved. | Made with nature's care 🌿
            </div>

          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
