"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/profile/Sidebar";
import { useGetMeQuery, useLogoutMutation } from "@/redux/slices/authApislice";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useDispatch } from "react-redux";
import { apiSlice } from "@/redux/slices/apiSlice";
export default function ProfileLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { data, isLoading, error } = useGetMeQuery();
    const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

    // Extract the current section from the pathname
    // e.g., /profile/my-orders -> my-orders
    const activeSection = pathname.split("/").pop();

    if (isLoading) {
        return (
            <>
                <Navbar solid />
                <div className="pt-32 pb-20 text-center min-h-screen">Loading profile...</div>
                <Footer />
            </>
        );
    }

    // 401 → not logged in
    if (error?.status === 401) {
        router.push("/login");
        return null;
    }

    // 404 or any other error
    if (error) {
        return (
            <>
                <Navbar solid />
                <div className="pt-32 pb-20 text-center min-h-screen">Unable to load profile</div>
                <Footer />
            </>
        );
    }

    // safety guard
    if (!data || !data.user) {
        return (
            <>
                <Navbar solid />
                <div className="pt-32 pb-20 text-center min-h-screen">Loading user...</div>
                <Footer />
            </>
        );
    }


    const handleLogout = async () => {
        try {
            await logout().unwrap();

            // 🔥 This clears ALL RTK Query cache instantly
            dispatch(apiSlice.util.resetApiState());

            router.push("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const user = data.user;

    return (
        <div>
            <Navbar solid />
            <section className="bg-white min-h-screen pt-24 pb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Welcome, {user.name}
                    </h1>

                    {/* Page header */}
                    <div className="mb-6 flex items-center justify-between">
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2 border border-gray-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                            <span className="text-sm font-medium">Menu</span>
                        </button>

                        <div>
                            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                                My Account
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Manage your orders, personal details, and preferences
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
                        <Sidebar
                            active={activeSection}
                            isOpen={isSidebarOpen}
                            onClose={() => setIsSidebarOpen(false)}
                            onLogout={handleLogout}
                            isLoggingOut={isLoggingOut}
                        />

                        <main className="flex-1 min-w-0">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
