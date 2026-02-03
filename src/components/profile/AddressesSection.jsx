"use client";

import { useState } from "react";
import { MapPin, Plus, Edit3, Trash2, Check, X } from "lucide-react";

export default function AddressesSection() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      street: "123 Main Street",
      city: "Virar",
      state: "Maharashtra",
      pincode: "401303",
      phone: "+91 98765 43210",
      isDefault: true
    }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing address
      setAddresses(addresses.map(addr =>
        addr.id === editingId ? { ...formData, id: editingId } : addr
      ));
    } else {
      // Add new address
      const newAddress = {
        id: Date.now(),
        ...formData,
        isDefault: addresses.length === 0
      };
      setAddresses([...addresses, newAddress]);
    }
    resetForm();
  };

  const handleEdit = (address) => {
    setEditingId(address.id);
    setFormData(address);
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const resetForm = () => {
    setFormData({ name: "", street: "", city: "", state: "", pincode: "", phone: "" });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-green-100 rounded-lg">
          <MapPin className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
          <p className="text-sm text-gray-500">
            Manage your shipping and billing addresses for faster checkout.
          </p>
        </div>
      </div>

      {/* Add New Address Form */}
      {(isAdding || editingId) && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Label <span className="text-gray-500">(Home/Work)</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--arna-accent)]/20 focus:border-[var(--arna-accent)] outline-none transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--arna-accent)]/20 focus:border-[var(--arna-accent)] outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--arna-accent)]/20 focus:border-[var(--arna-accent)] outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--arna-accent)]/20 focus:border-[var(--arna-accent)] outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--arna-accent)]/20 focus:border-[var(--arna-accent)] outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--arna-accent)]/20 focus:border-[var(--arna-accent)] outline-none transition-all"
                required
              />
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2 bg-[var(--arna-accent)] hover:bg-[#08633d] text-white font-medium rounded-lg transition-colors flex items-center space-x-2 shadow-sm"
              >
                <Check size={20} />
                <span>{editingId ? "Update Address" : "Save Address"}</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                <X size={20} className="inline mr-2" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Addresses List */}
      <div className="space-y-4">
        {/* Add New Button */}
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-[var(--arna-accent)] hover:bg-[var(--arna-accent)]/5 transition-colors group"
          >
            <Plus size={20} className="text-gray-400 group-hover:text-[var(--arna-accent)]" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-[var(--arna-accent)]">Add New Address</span>
          </button>
        )}

        {/* Existing Addresses */}
        {addresses.map((address) => (
          <div
            key={address.id}
            className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border-l-4 border-l-transparent hover:border-l-[var(--arna-accent)]"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="px-3 py-1 bg-[var(--arna-accent)]/10 text-[var(--arna-accent)] text-sm font-medium rounded-full">
                    {address.name}
                  </span>
                  {address.isDefault && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      Default
                    </span>
                  )}
                </div>

                <p className="text-lg font-semibold text-gray-900 mb-1">{address.street}</p>
                <p className="text-gray-700 mb-1">{address.city}, {address.state} - {address.pincode}</p>
                <p className="text-sm text-gray-500">Phone: {address.phone}</p>
              </div>

              <div className="flex items-center space-x-2 ml-auto">
                <button
                  onClick={() => handleEdit(address)}
                  className="p-2 text-gray-400 hover:text-[var(--arna-accent)] hover:bg-[var(--arna-accent)]/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
