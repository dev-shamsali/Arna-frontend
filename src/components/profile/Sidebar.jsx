"use client";

import clsx from "clsx";
import { useEffect } from "react";
import { X, ChevronRight, Package, User, MapPin, CreditCard, HelpCircle, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MENU_ITEMS = [
  { key: "orders", label: "My Orders", icon: Package },
  { key: "profile", label: "Profile Details", icon: User },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "payment", label: "Payment Methods", icon: CreditCard },
  { key: "help", label: "Help & Support", icon: HelpCircle },
  { key: "general", label: "Account Settings", icon: Settings },
];

export default function Sidebar({ active, onChange, isOpen, onClose }) {

  // Close sidebar on window resize if switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        onClose();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="p-6 md:p-4 mb-4 md:mb-0">
        <h2 className="text-2xl font-serif font-bold text-gray-900 md:hidden">Menu</h2>
      </div>

      <nav className="flex-1 space-y-1 px-3 md:px-0">
        {MENU_ITEMS.map((item) => {
          const isActive = active === item.key;
          const Icon = item.icon;

          return (
            <button
              key={item.key}
              onClick={() => {
                onChange(item.key);
                onClose && onClose();
              }}
              className={clsx(
                "group w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200",
                isActive
                  ? "bg-green-50 text-[var(--arna-accent)] ring-1 ring-[var(--arna-accent)]/20 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={clsx("w-5 h-5", isActive ? "text-[var(--arna-accent)]" : "text-gray-400 group-hover:text-gray-600")} />
                <span>{item.label}</span>
              </div>

              {isActive && (
                <motion.div layoutId="active-pill" className="block md:hidden">
                  <ChevronRight className="w-4 h-4 text-[var(--arna-accent)]" />
                </motion.div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto md:hidden">
        <button onClick={onClose} className="w-full py-3 text-sm text-gray-500 hover:text-gray-900 bg-gray-50 rounded-xl">
          Close Menu
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Slide-over Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-[280px] bg-white shadow-2xl md:hidden overflow-y-auto"
          >
            {/* Close button absolute */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Static Sidebar */}
      <aside className="hidden md:block w-72 shrink-0">
        <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sticky top-24">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}
