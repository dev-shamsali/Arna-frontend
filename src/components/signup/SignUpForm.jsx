"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Phone, Lock, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSignupMutation, useGoogleLoginMutation } from "@/redux/slices/authApislice";
import { useRouter } from "next/navigation";
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
    const router = useRouter();
    const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
    const [googleLogin] = useGoogleLoginMutation();
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

    useEffect(() => {
        if (!window.google) return;

        window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,

            callback: async (response) => {
                try {
                    await googleLogin({ credential: response.credential }).unwrap();
                    router.push("/");
                } catch (err) {
                    console.error("Google login failed", err);
                }
            },
            ux_mode: "popup",
            use_fedcm_for_prompt: false,
        });
    }, []);


    useEffect(() => {
        console.log("Google Client ID:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    }, []);


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

        try {
            const payload = {
                name: formData.fullName,
                email: formData.email,
                phoneNo: formData.phone,
                password: formData.password,
            };

            await signup(payload).unwrap();
            router.push("/login");

        } catch (err) {
            console.error("Signup error:", err);

            if (err?.status === 409) {
                setErrors({ email: "User already exists" });
            } else if (err?.data?.message) {
                alert(err.data.message);
            } else {
                alert("Something went wrong");
            }
        }
    };

    const handleGoogleLogin = () => {
        if (!window.google) {
            alert("Google SDK not loaded");
            return;
        }

        window.google.accounts.id.prompt();
    };


    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleVerifyOtp = async () => {
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
    };

    const getStrengthText = () => {
        if (passwordStrength <= 1) return "Weak";
        if (passwordStrength === 2) return "Fair";
        if (passwordStrength === 3) return "Good";
        return "Strong";
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-20 sm:py-24 md:py-28 lg:py-32 bg-white dark:bg-white">
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

            <div className="relative z-10 w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto 
                px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12
                bg-white/80 dark:bg-white/80 backdrop-blur-xl 
                border border-white/20 dark:border-white/20 
                shadow-2xl rounded-2xl overflow-hidden">

                <AnimatePresence mode="wait">
                    {step === "form" && (
                        <motion.div
                            key="register-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-6 sm:mb-7 md:mb-8 lg:mb-10">
                                <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 dark:text-gray-900 mb-2">
                                    Create Your Account
                                </h2>
                                <p className="text-sm sm:text-base md:text-base lg:text-lg text-gray-500 dark:text-gray-500">
                                    Join us to get started
                                </p>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-4 sm:space-y-4 md:space-y-5 lg:space-y-6">
                                {/* Full Name */}
                                <div className="space-y-1.5">
                                    <label className="text-xs sm:text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-700 ml-1">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 md:py-3 lg:py-3.5 pl-9 sm:pl-10 bg-gray-50 dark:bg-gray-50 border border-gray-200 dark:border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e5e3f]/20 focus:border-[#1e5e3f] transition-all text-gray-900 dark:text-gray-900 text-sm sm:text-sm md:text-base"
                                            placeholder="Enter your full name"
                                        />
                                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                    {errors.fullName && <p className="text-xs sm:text-xs md:text-sm text-red-500 ml-1 mt-1">{errors.fullName}</p>}
                                </div>

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label className="text-xs sm:text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-700 ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 md:py-3 lg:py-3.5 pl-9 sm:pl-10 bg-gray-50 dark:bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-900 dark:text-gray-900 text-sm sm:text-sm md:text-base ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 dark:border-gray-200 focus:ring-[#1e5e3f]/20 focus:border-[#1e5e3f]'}`}
                                            placeholder="We'll use this for verification"
                                        />
                                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                    {errors.email && <p className="text-xs sm:text-xs md:text-sm text-red-500 ml-1 mt-1">{errors.email}</p>}
                                </div>

                                {/* Phone */}
                                <div className="space-y-1.5">
                                    <label className="text-xs sm:text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-700 ml-1">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 md:py-3 lg:py-3.5 pl-9 sm:pl-10 bg-gray-50 dark:bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-900 dark:text-gray-900 text-sm sm:text-sm md:text-base ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 dark:border-gray-200 focus:ring-[#1e5e3f]/20 focus:border-[#1e5e3f]'}`}
                                            placeholder="For verification"
                                        />
                                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                    {errors.phone && <p className="text-xs sm:text-xs md:text-sm text-red-500 ml-1 mt-1">{errors.phone}</p>}
                                </div>

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <label className="text-xs sm:text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-700 ml-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 md:py-3 lg:py-3.5 pl-9 sm:pl-10 pr-10 bg-gray-50 dark:bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-900 dark:text-gray-900 text-sm sm:text-sm md:text-base ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 dark:border-gray-200 focus:ring-[#1e5e3f]/20 focus:border-[#1e5e3f]'}`}
                                            placeholder="At least 8 characters"
                                        />
                                        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2" />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                        </button>
                                    </div>
                                    {formData.password && (
                                        <div className="flex items-center gap-2 mt-1.5 ml-1">
                                            <div className="flex-1 h-1.5 sm:h-2 bg-gray-100 dark:bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                                                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-xs sm:text-xs md:text-sm font-medium text-gray-500 dark:text-gray-500 whitespace-nowrap">
                                                {getStrengthText()}
                                            </span>
                                        </div>
                                    )}
                                    {errors.password && <p className="text-xs sm:text-xs md:text-sm text-red-500 ml-1 mt-1">{errors.password}</p>}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-1.5">
                                    <label className="text-xs sm:text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-700 ml-1">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 md:py-3 lg:py-3.5 pl-9 sm:pl-10 bg-gray-50 dark:bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-900 dark:text-gray-900 text-sm sm:text-sm md:text-base ${errors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 dark:border-gray-200 focus:ring-[#1e5e3f]/20 focus:border-[#1e5e3f]'}`}
                                            placeholder="Re-enter password"
                                        />
                                        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                    {errors.confirmPassword && <p className="text-xs sm:text-xs md:text-sm text-red-500 ml-1 mt-1">{errors.confirmPassword}</p>}
                                </div>

                                {/* Terms Checkbox */}
                                <div className="flex items-start gap-2 sm:gap-3 mt-4 sm:mt-5 md:mt-6">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        name="agreed"
                                        checked={formData.agreed}
                                        onChange={handleChange}
                                        className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 rounded border-gray-300 text-[#1e5e3f] focus:ring-[#1e5e3f] cursor-pointer flex-shrink-0"
                                    />
                                    <label htmlFor="terms" className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-500 cursor-pointer leading-relaxed">
                                        I agree to the{" "}
                                        <Link href="/terms" className="text-[#1e5e3f] hover:underline">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/privacy" className="text-[#1e5e3f] hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={!formData.agreed || loading}
                                    className="w-full py-3 sm:py-3.5 md:py-3.5 lg:py-4 mt-5 sm:mt-6 bg-[#1e5e3f] hover:bg-[#164a32] text-white font-medium rounded-xl shadow-lg shadow-[#1e5e3f]/20 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-sm md:text-base"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        "Create Account"
                                    )}
                                </motion.button>

                                <div className="relative my-5 sm:my-6 md:my-7 lg:my-8">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-3 sm:px-4 bg-white text-gray-500 text-xs sm:text-sm md:text-base">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleGoogleLogin}
                                    type="button"
                                    className="w-full py-2.5 sm:py-3 md:py-3.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl shadow-sm flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 hover:bg-gray-50 text-sm sm:text-sm md:text-base"
                                >
                                    <svg className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 24 24">
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

                            <div className="mt-5 sm:mt-6 md:mt-7 lg:mt-8 text-center">
                                <p className="text-gray-500 dark:text-gray-500 text-xs sm:text-sm md:text-base">
                                    Already have an account?{" "}
                                    <Link href="/login" className="font-semibold text-[#1e5e3f] hover:underline">
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
                            transition={{ duration: 0.3 }}
                            className="text-center py-6 sm:py-8 md:py-10 lg:py-12"
                        >
                            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-green-100 dark:bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6">
                                <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-green-600 dark:text-green-600" />
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-serif font-bold text-gray-900 dark:text-gray-900 mb-2">
                                Verify Your Number
                            </h2>
                            <p className="text-sm sm:text-base md:text-base lg:text-lg text-gray-500 dark:text-gray-500 mb-6 sm:mb-7 md:mb-8 px-4">
                                Enter the 4-digit code sent to <br />
                                <span className="font-medium text-gray-900 dark:text-gray-900 break-all sm:break-normal">
                                    {formData.phone}
                                </span>
                            </p>
                            <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 justify-center mb-6 sm:mb-7 md:mb-8 px-2">
                                {otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        id={`otp-${i}`}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(i, e.target.value)}
                                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 lg:w-16 lg:h-16 text-center text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold bg-gray-50 dark:bg-gray-50 border border-gray-200 dark:border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e5e3f]/20 focus:border-[#1e5e3f] transition-all text-gray-900 dark:text-gray-900"
                                    />
                                ))}
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleVerifyOtp}
                                disabled={otp.some(d => !d) || loading}
                                className="w-full py-3 sm:py-3.5 md:py-3.5 lg:py-4 bg-[#1e5e3f] hover:bg-[#164a32] text-white font-medium rounded-xl shadow-lg shadow-[#1e5e3f]/20 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 text-sm sm:text-sm md:text-base"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    "Verify & Continue"
                                )}
                            </motion.button>
                            <button
                                onClick={() => setStep("form")}
                                className="mt-5 sm:mt-6 text-sm sm:text-sm md:text-base text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-600"
                            >
                                Back to Sign Up
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}