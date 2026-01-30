"use client";

import { useState } from "react";
import Sidebar from "@/components/profile/Sidebar";
import OrdersSection from "@/components/profile/OrdersSection";
import ProfileSection from "@/components/profile/ProfileSection";
import AddressesSection from "@/components/profile/AddressesSection";
import PaymentSection from "@/components/profile/PaymentSection";
import HelpSection from "@/components/profile/HelpSection";

export default function Content() {
  const [active, setActive] = useState("orders");

  return (
    <section className="bg-white min-h-screen pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            My Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your orders, personal details, and preferences
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
          
          {/* Sidebar */}
          <aside className="w-full md:w-72 shrink-0">
            <Sidebar active={active} onChange={setActive} />
          </aside>

          {/* Main content - Always white background */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8">
              {active === "orders" && <OrdersSection />}
              {active === "profile" && <ProfileSection />}
              {active === "addresses" && <AddressesSection />}
              {active === "payment" && <PaymentSection />}
              {active === "help" && <HelpSection />}
            </div>
          </main>

        </div>
      </div>
    </section>
  );
}
