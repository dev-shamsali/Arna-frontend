"use client";

import { useState } from "react";
import { User, Edit3, Check, X } from "lucide-react";

export default function ProfileSection({user}) {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [originalEmail, setOriginalEmail] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save email logic here (API call)
    setOriginalEmail(email);
    setIsEditingEmail(false);
  };

  const handleCancel = () => {
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
          <h2 className="text-xl font-serif font-bold text-gray-900">Personal Information</h2>
          <p className="text-sm text-gray-500">
            Manage your personal details and account settings.
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid gap-6">
        {/* Name - Non-editable */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <p className="text-base font-medium text-gray-900">{user.name}</p>
          </div>
          <span className="px-2.5 py-1 bg-gray-200/50 text-xs font-medium text-gray-600 rounded-lg">
            Read-only
          </span>
        </div>

        {/* Mobile - Non-editable */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Mobile Number
            </label>
            <p className="text-base font-medium text-gray-900">{user.phoneNo}</p>
          </div>
          <span className="px-2.5 py-1 bg-gray-200/50 text-xs font-medium text-gray-600 rounded-lg">
            Verified
          </span>
        </div>

        {/* Email - Editable */}
        <div className="p-4 bg-white rounded-xl border border-gray-200 transition-all hover:border-[var(--arna-accent)]/30">
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Email Address
          </label>

          {isEditingEmail ? (
            // Edit mode
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--arna-accent)]/20 focus:border-[var(--arna-accent)] outline-none transition-all"
                placeholder="Enter your email"
                autoFocus
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
                  onClick={handleCancel}
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
            <p className="text-xs text-red-600/80 mt-0.5">Permanently remove your account and data.</p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 hover:bg-red-50 rounded-lg transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
