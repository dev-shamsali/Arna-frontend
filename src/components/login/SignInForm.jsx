"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SignInForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        emailOrPhone: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.emailOrPhone) {
            newErrors.emailOrPhone = "Email or Phone is required";
        } else {
            // Basic email/phone checks
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\+?[0-9]{10,15}$/;
            if (!emailRegex.test(formData.emailOrPhone) && !phoneRegex.test(formData.emailOrPhone)) {
                newErrors.emailOrPhone = "Enter a valid email or phone number";
            }
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false);

        // Handle successful login (e.g., redirect)
        alert("Logged in successfully!");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 bg-white dark:bg-white">
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/logo.png"
                    alt="Arna Skin Care Background"
                    fill
                    className="object-cover opacity-20 dark:opacity-20"
                    priority
                />
                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm dark:bg-white/30" />
            </div>

            <div className="relative z-10 w-full max-w-md mx-auto p-6 md:p-8 bg-white/80 dark:bg-white/80 backdrop-blur-xl border border-white/20 dark:border-white/20 shadow-2xl rounded-2xl">
                <div className="text-center mb-8">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-900 mb-2"
                    >
                        Welcome Back
                    </motion.h2>
                    <p className="text-gray-500 dark:text-gray-500">Log in to continue </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email or Phone */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-700 ml-1">
                            Email or Phone Number
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="emailOrPhone"
                                value={formData.emailOrPhone}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 pl-10 bg-gray-50 dark:bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-gray-900 ${errors.emailOrPhone
                                    ? "border-red-500 focus:ring-red-200"
                                    : "border-gray-200 dark:border-gray-200 focus:border-green-500 focus:ring-green-500/50"
                                }`}
                                placeholder="user@example.com"
                            />
                            <Mail className="w-5 h-5 text-gray-400 dark:text-gray-400 absolute left-3 top-3.5" />
                        </div>
                        {errors.emailOrPhone && (
                            <p className="text-xs text-red-500 ml-1 animate-pulse">
                                {errors.emailOrPhone}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-700">
                                Password
                            </label>
                            <Link href="/forgot-password" className="text-xs font-medium text-[var(--arna-accent)] hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 pl-10 pr-10 bg-gray-50 dark:bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-gray-900 ${errors.password
                                    ? "border-red-500 focus:ring-red-200"
                                    : "border-gray-200 dark:border-gray-200 focus:border-green-500 focus:ring-green-500/50"
                                }`}
                                placeholder="••••••••"
                            />
                            <Lock className="w-5 h-5 text-gray-400 dark:text-gray-400 absolute left-3 top-3.5" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-500 ml-1 animate-pulse">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-[var(--arna-accent)] hover:bg-green-600 text-white font-medium rounded-xl shadow-lg shadow-[var(--arna-accent)]/30 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Sign In <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </motion.button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 dark:text-gray-500 text-sm">
                        Don't have an account?{" "}
                        <Link href="/signup" className="font-semibold text-[var(--arna-accent)] hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
