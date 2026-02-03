"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Phone, Lock, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SignUpForm() {
    const [step, setStep] = useState("form"); // 'form' | 'otp'
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState(["", "", "", ""]);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreed: false
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    // Real-time password strength checker
    useEffect(() => {
        let score = 0;
        const pwd = formData.password;
        if (pwd.length > 7) score += 1;
        if (/[A-Z]/.test(pwd)) score += 1;
        if (/[0-9]/.test(pwd)) score += 1;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
        setPasswordStrength(score);
    }, [formData.password]);

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = "Please enter a valid 10-digit number";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Must be at least 8 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        // Simulate API call to send OTP
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setStep("otp");
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleVerifyOtp = async () => {
        // Simulate verification
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        alert("Account created successfully!");
        // Redirect logic here
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const getStrengthColor = () => {
        if (passwordStrength <= 1) return "bg-red-500";
        if (passwordStrength === 2) return "bg-yellow-500";
        if (passwordStrength === 3) return "bg-blue-500";
        return "bg-green-500";
    }

    const getStrengthText = () => {
        if (passwordStrength <= 1) return "Weak";
        if (passwordStrength === 2) return "Fair";
        if (passwordStrength === 3) return "Good";
        return "Strong";
    }

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

            <div className="relative z-10 w-full max-w-lg mx-auto p-6 md:p-10 bg-white/80 dark:bg-white/80 backdrop-blur-xl border border-white/20 dark:border-white/20 shadow-2xl rounded-2xl overflow-hidden">

                <AnimatePresence mode="wait">
                    {step === "form" && (
                        <motion.div
                            key="register-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-900 mb-2">Create Your Account</h2>
                                <p className="text-gray-500 dark:text-gray-500">Join us to get started </p>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-4">

                                {/* Full Name */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-700 ml-1">Full Name</label>
                                    <div className="relative">
                                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                                            className="w-full px-4 py-3 pl-10 bg-gray-50 dark:bg-gray-50 border border-gray-200 dark:border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-gray-900 dark:text-gray-900"
                                            placeholder="Enter your full name"
                                        />
                                        <User className="w-5 h-5 text-gray-400 dark:text-gray-400 absolute left-3 top-3.5" />
                                    </div>
                                    {errors.fullName && <p className="text-xs text-red-500 ml-1">{errors.fullName}</p>}
                                </div>

                                {/* Email */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-700 ml-1">Email Address</label>
                                    <div className="relative">
                                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                                            className={`w-full px-4 py-3 pl-10 bg-gray-50 dark:bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-900 dark:text-gray-900 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 dark:border-gray-200 focus:ring-green-500/50 focus:border-green-500'}`}
                                            placeholder="We'll use this for verification"
                                        />
                                        <Mail className="w-5 h-5 text-gray-400 dark:text-gray-400 absolute left-3 top-3.5" />
                                    </div>
                                    {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
                                </div>

                                {/* Phone */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-700 ml-1">Phone Number</label>
                                    <div className="relative">
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                            className={`w-full px-4 py-3 pl-10 bg-gray-50 dark:bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-900 dark:text-gray-900 ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 dark:border-gray-200 focus:ring-green-500/50 focus:border-green-500'}`}
                                            placeholder="For verification"
                                        />
                                        <Phone className="w-5 h-5 text-gray-400 dark:text-gray-400 absolute left-3 top-3.5" />
                                    </div>
                                    {errors.phone && <p className="text-xs text-red-500 ml-1">{errors.phone}</p>}
                                </div>

                                {/* Password */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-700 ml-1">Password</label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                                            className={`w-full px-4 py-3 pl-10 pr-10 bg-gray-50 dark:bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-900 dark:text-gray-900 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 dark:border-gray-200 focus:ring-green-500/50 focus:border-green-500'}`}
                                            placeholder="At least 8 characters"
                                        />
                                        <Lock className="w-5 h-5 text-gray-400 dark:text-gray-400 absolute left-3 top-3.5" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-600">
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    {/* Strength Meter */}
                                    {formData.password && (
                                        <div className="flex items-center gap-2 mt-1 ml-1">
                                            <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-100 rounded-full overflow-hidden">
                                                <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: `${(passwordStrength / 4) * 100}%` }} />
                                            </div>
                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-500">{getStrengthText()}</span>
                                        </div>
                                    )}
                                    {errors.password && <p className="text-xs text-red-500 ml-1">{errors.password}</p>}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-700 ml-1">Confirm Password</label>
                                    <div className="relative">
                                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                                            className={`w-full px-4 py-3 pl-10 bg-gray-50 dark:bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-900 dark:text-gray-900 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 dark:border-gray-200 focus:ring-green-500/50 focus:border-green-500'}`}
                                            placeholder="Re-enter password"
                                        />
                                        <Lock className="w-5 h-5 text-gray-400 dark:text-gray-400 absolute left-3 top-3.5" />
                                    </div>
                                    {errors.confirmPassword && <p className="text-xs text-red-500 ml-1">{errors.confirmPassword}</p>}
                                </div>

                                {/* Terms Checkbox */}
                                <div className="flex items-start gap-3 mt-4">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        name="agreed"
                                        checked={formData.agreed}
                                        onChange={handleChange}
                                        className="w-5 h-5 mt-0.5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-500 dark:text-gray-500 cursor-pointer">
                                        I agree to the <Link href="/terms" className="text-[var(--arna-accent)] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[var(--arna-accent)] hover:underline">Privacy Policy</Link>
                                    </label>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={!formData.agreed || loading}
                                    className="w-full py-4 bg-[var(--arna-accent)] hover:bg-green-600 text-white font-medium rounded-xl shadow-lg shadow-[var(--arna-accent)]/30 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-4"
                                >
                                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Create Account"}
                                </motion.button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-gray-500 dark:text-gray-500 text-sm">
                                    Already have an account?{" "}
                                    <Link href="/login" className="font-semibold text-[var(--arna-accent)] hover:underline">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {step === "otp" && (
                        <motion.div
                            key="otp-step"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="text-center py-10"
                        >
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-600" />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-900 mb-2">Verify Your Number</h2>
                            <p className="text-gray-500 dark:text-gray-500 mb-8">Enter the 4-digit code sent to <br /><span className="font-medium text-gray-900 dark:text-gray-900">{formData.phone}</span></p>

                            <div className="flex gap-4 justify-center mb-8">
                                {otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        id={`otp-${i}`}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(i, e.target.value)}
                                        className="w-14 h-14 text-center text-2xl font-bold bg-gray-50 dark:bg-gray-50 border border-gray-200 dark:border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 dark:text-gray-900"
                                    />
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleVerifyOtp}
                                disabled={otp.some(d => !d) || loading}
                                className="w-full py-4 bg-[var(--arna-accent)] hover:bg-green-600 text-white font-medium rounded-xl shadow-lg shadow-[var(--arna-accent)]/30 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60"
                            >
                                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Verify & Continue"}
                            </motion.button>

                            <button onClick={() => setStep("form")} className="mt-6 text-sm text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-600">
                                Back to Sign Up
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
