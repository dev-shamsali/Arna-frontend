"use client";

import { useState } from "react";
import Sidebar from "@/components/profile/Sidebar";
import OrdersSection from "@/components/profile/OrdersSection";
import ProfileSection from "@/components/profile/ProfileSection";
import AddressesSection from "@/components/profile/AddressesSection";
import PaymentSection from "@/components/profile/PaymentSection";
import HelpSection from "@/components/profile/HelpSection";
import { useGetMeQuery } from "@/redux/slices/authApislice";
export default function Content() {
  const [active, setActive] = useState("orders");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data, isLoading, error } = useGetMeQuery();
  if (isLoading) {
    return <div className="pt-24 text-center">Loading profile...</div>;
  }

  // 401 → not logged in
  if (error?.status === 401) {
    window.location.href = "/login";
    return null;
  }

  // 404 or any other error
  if (error) {
    return <div className="pt-24 text-center">Unable to load profile</div>;
  }

  // safety guard
  if (!data || !data.user) {
    return <div className="pt-24 text-center">Loading user...</div>;
  }

  const user = data.user;
  return (
    <section className="bg-white min-h-screen pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome, {user.name}
        </h1>

        {/* Page header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              My Account
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your orders, personal details, and preferences
            </p>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2 border border-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            <span className="text-sm font-medium">Menu</span>
          </button>
        </div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-10">

          {/* Sidebar - Component controls its own responsive behavior */}
          <Sidebar
            active={active}
            onChange={setActive}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main content - Always white background */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8">
              {active === "orders" && <OrdersSection />}
              {active === "profile" && <ProfileSection user={user} />}
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
