"use client";

import { useState } from "react";
import { User, Edit3, Check, X } from "lucide-react";
import { useUpdateMeMutation } from "@/redux/slices/authApislice";
export default function ProfileSection({ user }) {
  // State for editing different fields
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [updateMe, { isLoading }] = useUpdateMeMutation();

  // State for field values
  const [name, setName] = useState(user.name);
  const [phoneNo, setPhoneNo] = useState(user.phoneNo);
  const [email, setEmail] = useState(user.email);

  // State for original values (to revert on cancel)
  const [originalName, setOriginalName] = useState(user.name);
  const [originalPhone, setOriginalPhone] = useState(user.phoneNo);
  const [originalEmail, setOriginalEmail] = useState(user.email);

  // Check if user logged in with email (you can adjust this logic based on your auth setup)
  const isGoogleLogin = user.authProvider === "google";


  // Handle Name Submit
  const handleNameSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateMe({ name }).unwrap();
      setOriginalName(name);
      setIsEditingName(false);
    } catch (err) {
      console.error(err?.data?.message || "Failed to update name");
    }
  };

  // Handle Phone Submit
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateMe({ phoneNo }).unwrap();
      setOriginalPhone(phoneNo);
      setIsEditingPhone(false);
    } catch (err) {
      console.error(err?.data?.message || "Failed to update phone");
    }
  };


  // Handle Email Submit
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateMe({ email }).unwrap();
      setOriginalEmail(email);
      setIsEditingEmail(false);
    } catch (err) {
      console.error(err?.data?.message || "Failed to update email");
    }
  };


  // Cancel handlers
  const handleNameCancel = () => {
    setName(originalName);
    setIsEditingName(false);
  };

  const handlePhoneCancel = () => {
    setPhoneNo(originalPhone);
    setIsEditingPhone(false);
  };

  const handleEmailCancel = () => {
    setEmail(originalEmail);
    setIsEditingEmail(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4 border-b border-gray-100 pb-6">
        <div className="p-3 bg-[var(--arna-accent)]/10 rounded-xl">
          <User className="h-6 w-6 text-[var(--arna-accent)]" />
        </div>
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-900">
            Personal Information
          </h2>
          <p className="text-sm text-gray-500">
            Manage your personal details and account settings.
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid gap-6">
        {/* Name - Editable */}
        <div className="p-4 bg-white rounded-xl border border-gray-200 transition-all hover:border-[var(--arna-accent)]/30">
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Full Name
          </label>

          {isEditingName ? (
            // Edit mode
            <form onSubmit={handleNameSubmit} className="flex items-center gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--arna-accent)]/20 focus:border-[var(--arna-accent)] outline-none transition-all"
                placeholder="Enter your full name"
                autoFocus
                required
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="p-2.5 text-white bg-[var(--arna-accent)] hover:bg-[#08633d] rounded-lg transition-colors shadow-sm"
                  title="Save"
                >
                  <Check size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleNameCancel}
                  className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                  title="Cancel"
                >
                  <X size={18} />
                </button>
              </div>
            </form>
          ) : (
            // View mode
            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-gray-900">{originalName}</p>
              <button
                onClick={() => setIsEditingName(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[var(--arna-accent)] hover:bg-[var(--arna-accent)]/5 font-medium text-sm rounded-lg transition-colors"
              >
                <Edit3 size={15} />
                <span>Update</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile - Editable */}
        <div className="p-4 bg-white rounded-xl border border-gray-200 transition-all hover:border-[var(--arna-accent)]/30">
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Mobile Number
          </label>

          {isEditingPhone ? (
            // Edit mode
            <form onSubmit={handlePhoneSubmit} className="flex items-center gap-3">
              <input
                type="tel"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--arna-accent)]/20 focus:border-[var(--arna-accent)] outline-none transition-all"
                placeholder="Enter your mobile number"
                autoFocus
                required
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="p-2.5 text-white bg-[var(--arna-accent)] hover:bg-[#08633d] rounded-lg transition-colors shadow-sm"
                  title="Save"
                >
                  <Check size={18} />
                </button>
                <button
                  type="button"
                  onClick={handlePhoneCancel}
                  className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                  title="Cancel"
                >
                  <X size={18} />
                </button>
              </div>
            </form>
          ) : (
            // View mode
            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-gray-900">{originalPhone}</p>
              <button
                onClick={() => setIsEditingPhone(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[var(--arna-accent)] hover:bg-[var(--arna-accent)]/5 font-medium text-sm rounded-lg transition-colors"
              >
                <Edit3 size={15} />
                <span>Update</span>
              </button>
            </div>
          )}
        </div>

        {/* Email - Conditionally Editable */}
        <div
          className={`p-4 rounded-xl border transition-all ${isGoogleLogin
            ? "bg-gray-50 border-gray-100"
            : "bg-white border-gray-200 hover:border-[var(--arna-accent)]/30"
            }`}
        >
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Email Address
          </label>

          {isGoogleLogin ? (
            // Read-only mode for email login
            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-gray-900">{originalEmail}</p>
              <span className="px-2.5 py-1 bg-gray-200/50 text-xs font-medium text-gray-600 rounded-lg">
                Login Method
              </span>
            </div>
          ) : isEditingEmail ? (
            // Edit mode
            <form onSubmit={handleEmailSubmit} className="flex items-center gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--arna-accent)]/20 focus:border-[var(--arna-accent)] outline-none transition-all"
                placeholder="Enter your email"
                autoFocus
                required
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="p-2.5 text-white bg-[var(--arna-accent)] hover:bg-[#08633d] rounded-lg transition-colors shadow-sm"
                  title="Save"
                >
                  <Check size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleEmailCancel}
                  className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                  title="Cancel"
                >
                  <X size={18} />
                </button>
              </div>
            </form>
          ) : (
            // View mode
            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-gray-900">{originalEmail}</p>
              <button
                onClick={() => setIsEditingEmail(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[var(--arna-accent)] hover:bg-[var(--arna-accent)]/5 font-medium text-sm rounded-lg transition-colors"
              >
                <Edit3 size={15} />
                <span>Update</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="pt-8 border-t border-gray-100">
        <h3 className="text-sm font-semibold text-red-600 mb-4">Danger Zone</h3>
        <div className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl">
          <div>
            <p className="text-sm font-medium text-gray-900">Delete Account</p>
            <p className="text-xs text-red-600/80 mt-0.5">
              Permanently remove your account and data.
            </p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 hover:bg-red-50 rounded-lg transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}