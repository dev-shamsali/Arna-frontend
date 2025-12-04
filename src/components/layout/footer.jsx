"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0A7A4E] text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8">
          
          <div>
            <h3 className="font-serif text-2xl mb-4">ARNA</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Pure, safe, and effective skincare & haircare solutions inspired by Ayurveda and modern science.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Shop Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Skincare</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Haircare</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <span className="text-lg">f</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <span className="text-lg">in</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <span className="text-lg">ig</span>
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
          <p>© 2024 ARNA. All rights reserved. | Made with nature's care 🌿</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
