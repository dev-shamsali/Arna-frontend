"use client";

import { useState } from "react";
import { User, Edit3, Check, X } from "lucide-react";

export default function ProfileSection() {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState("user@example.com");
  const [originalEmail, setOriginalEmail] = useState("user@example.com");

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-green-100 rounded-lg">
          <User className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
          <p className="text-sm text-gray-500">
            Update your personal information and account details.
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="space-y-6">
          {/* Name - Non-editable */}
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <p className="text-lg font-semibold text-gray-900">John Doe</p>
            </div>
            <span className="px-2 py-1 bg-gray-100 text-xs text-gray-500 rounded-full">
              Cannot be edited
            </span>
          </div>

          {/* Mobile - Non-editable */}
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <p className="text-lg font-semibold text-gray-900">+91 98765 43210</p>
            </div>
            <span className="px-2 py-1 bg-gray-100 text-xs text-gray-500 rounded-full">
              Cannot be edited
            </span>
          </div>

          {/* Email - Editable */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            
            {isEditingEmail ? (
              // Edit mode
              <form onSubmit={handleSubmit} className="flex items-center space-x-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                  title="Save"
                >
                  <Check size={20} />
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Cancel"
                >
                  <X size={20} />
                </button>
              </form>
            ) : (
              // View mode
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-gray-900">{originalEmail}</p>
                <button
                  onClick={() => setIsEditingEmail(true)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Edit3 size={16} />
                  <span>Edit</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
