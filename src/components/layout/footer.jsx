"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import Link from "next/link";

const Footer = () => {
  const [whatsappHovered, setWhatsappHovered] = useState(false);
  const [showPing, setShowPing] = useState(true);

  useEffect(() => {
    // Show ping animation for 5 seconds every 10 minutes
    const interval = setInterval(() => {
      setShowPing(true);
      setTimeout(() => {
        setShowPing(false);
      }, 5000); // Hide after 5 seconds
    }, 600000); // 10 minutes = 600000ms

    // Initial timeout to hide the first ping after 5 seconds
    const initialTimeout = setTimeout(() => {
      setShowPing(false);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

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
          {showPing && (
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75 z-0" />
          )}

          <motion.div
            className="relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg hover:shadow-2xl flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8 text-white" />
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
      <footer className="relative w-full overflow-hidden bg-[#1e5e3f]">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#14422c] via-[#1e5e3f] to-[#14422c]" />

        {/* Subtle Brand Glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(183,127,107,0.2), transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(197,160,89,0.15), transparent 50%)
            `,
          }}
        />

        <div className="relative z-10 text-white/90 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

              {/* Brand Section */}
              <div className="space-y-6">
                <Link href="/" className="inline-block">
                  <h3 className="font-serif text-3xl tracking-widest text-[#b77f6b]">ARNA</h3>
                </Link>
                <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                  Elevating your natural beauty through the perfect harmony of ancient wisdom and modern skincare science.
                </p>
                {/* Contact Detail Snippet */}
                <div className="space-y-4">
                  <p className="text-xs text-[#c5a059] uppercase tracking-widest">Inquiries</p>
                  <div className="flex flex-col gap-2">
                    <a href="mailto:hello@arnaskincare.com" className="text-sm hover:text-[#b77f6b] transition-colors">hello@arnaskincare.com</a>
                    <a href="tel:+918850925827" className="text-sm hover:text-[#b77f6b] transition-colors font-medium">+91 8850925827</a>
                  </div>
                </div>
              </div>

              {/* Navigation Column 1 */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c5a059] mb-8">Shop</h4>
                <ul className="space-y-4 text-sm font-light">
                  <li><a href="/products?category=skincare" className="text-white/60 hover:text-[#b77f6b] transition-all">• Skincare Essentials</a></li>
                  <li><a href="/products?category=haircare" className="text-white/60 hover:text-[#b77f6b] transition-all">• Haircare Rituals</a></li>
                  <li><a href="/products?filter=bestsellers" className="text-white/60 hover:text-[#b77f6b] transition-all">• Signature Bestsellers</a></li>
                  <li><a href="/products?filter=new" className="text-white/60 hover:text-[#b77f6b] transition-all">• New Collections</a></li>
                </ul>
              </div>

              {/* Navigation Column 2 */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c5a059] mb-8">Client Care</h4>
                <ul className="space-y-4 text-sm font-light">
                  <li><a href="/contact" className="text-white/60 hover:text-[#b77f6b] transition-all">• Contact Us</a></li>
                  <li><a href="/faq" className="text-white/60 hover:text-[#b77f6b] transition-all">• Frequently Asked Questions</a></li>
                  <li><a href="/shipping" className="text-white/60 hover:text-[#b77f6b] transition-all">• Shipping & Delivery</a></li>
                  <li><a href="/returns" className="text-white/60 hover:text-[#b77f6b] transition-all">• Returns & Exchanges</a></li>
                </ul>
              </div>

              {/* Social & Newsletter Concept */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c5a059] mb-6">Follow Our Journey</h4>
                  <div className="flex gap-4">
                    {[
                      { Icon: Facebook, href: "https://facebook.com" },
                      { Icon: Instagram, href: "https://instagram.com" },
                      { Icon: Linkedin, href: "https://linkedin.com" }
                    ].map((social, idx) => (
                      <motion.a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3 }}
                        className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#b77f6b]/20 hover:border-[#b77f6b] transition-all duration-300"
                      >
                        <social.Icon className="w-5 h-5 text-white/80" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-xs text-white/40 italic">
                    Pure, herbal, and mindfully crafted in India.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5 pt-10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Policy Links */}
                <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-[11px] uppercase tracking-widest text-white/40">
                  <a href="/privacy-policy" className="hover:text-[#c5a059] transition-colors">Privacy</a>
                  <a href="/terms-conditions" className="hover:text-[#c5a059] transition-colors">Terms</a>
                  <a href="/returns" className="hover:text-[#c5a059] transition-colors">Refunds</a>
                  <a href="/shipping" className="hover:text-[#c5a059] transition-colors">Shipping</a>
                </div>

                {/* Copyright */}
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/30">
                  © 2024 ARNA. All rights reserved. | Made with nature's care 🌿
                </div>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
