"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useGoogleLoginMutation, useLoginMutation } from "@/redux/slices/authApislice";
export default function SignInForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        emailOrPhone: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [login] = useLoginMutation();
    const [googleLogin] = useGoogleLoginMutation();

    useEffect(() => {
        const interval = setInterval(() => {
            if (!window.google) return;

            clearInterval(interval);

            window.google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                callback: async (response) => {
                    try {
                        await googleLogin({ credential: response.credential }).unwrap();
                        window.location.href = "/";
                    } catch (err) {
                        console.error("Google login failed", err);
                    }
                },
                ux_mode: "popup",
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);


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

        try {
            setLoading(true);

            const res = await login({
                email: formData.emailOrPhone,
                password: formData.password,
            }).unwrap();

            console.log("Login success:", res);

            // redirect after successful login
            window.location.href = "/profile";
        } catch (err) {
            console.error("Login error:", err);

            setErrors({
                password: err?.data?.message || "Invalid credentials",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        if (!window.google) {
            alert("Google SDK not loaded");
            return;
        }

        window.google.accounts.id.prompt();
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

            <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto p-5 sm:p-8 bg-white/80 dark:bg-white/80 backdrop-blur-xl border border-white/20 dark:border-white/20 shadow-2xl rounded-2xl">
                <div className="text-center mb-6 sm:mb-8">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-gray-900 mb-2"
                    >
                        Welcome Back
                    </motion.h2>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-500">Log in to continue </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
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
                                    : "border-gray-200 dark:border-gray-200 focus:border-[#1e5e3f] focus:ring-[#1e5e3f]/20"
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
                            <Link href="/forgot-password" size="sm" className="text-xs font-medium text-[#1e5e3f] hover:underline">
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
                                    : "border-gray-200 dark:border-gray-200 focus:border-[#1e5e3f] focus:ring-[#1e5e3f]/20"
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
                        className="w-full py-3 sm:py-3.5 bg-[#1e5e3f] hover:bg-[#164a32] text-white font-medium rounded-xl shadow-lg shadow-[#1e5e3f]/20 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Sign In <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </motion.button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl shadow-sm flex items-center justify-center gap-3 transition-all duration-300 hover:bg-gray-50"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Google
                    </motion.button>
                </form>

                <div className="mt-6 sm:mt-8 text-center">
                    <p className="text-gray-500 dark:text-gray-500 text-sm">
                        Don't have an account?{" "}
                        <Link href="/signup" className="font-semibold text-[#1e5e3f] hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
