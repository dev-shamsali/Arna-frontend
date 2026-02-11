"use client";

import { useState } from "react";
import { MapPin, Plus, Edit3, Trash2, Check, X, Home, Briefcase, MapPinned } from "lucide-react";
import { useGetMeQuery, useAddAddressMutation, useUpdateAddressMutation, useDeleteAddressMutation } from "@/redux/slices/authApislice";

export default function AddressesSection() {
  const { data, isLoading } = useGetMeQuery();
  const [addAddress] = useAddAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();

  const addresses = data?.user?.addresses || [];

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [formData, setFormData] = useState({
    houseNo: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    addressType: "home",
    isDefault: false,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateAddress({
          id: editingId,
          ...formData,
        }).unwrap();
      } else {
        await addAddress(formData).unwrap();
      }

      resetForm();
    } catch (error) {
      console.error("Address error:", error);
    }
  };

  const handleEdit = (address) => {
    setEditingId(address._id);
    setFormData({
      houseNo: address.houseNo,
      area: address.area,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      landmark: address.landmark || "",
      addressType: address.addressType || "home",
      isDefault: address.isDefault || false,
    });

    setIsAdding(false);
    // Scroll to form smoothly
    setTimeout(() => {
      document.querySelector('.address-form')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAddress(id).unwrap();
      setDeleteConfirmId(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      houseNo: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
      addressType: "home",
      isDefault: false,
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case 'home':
        return <Home size={16} className="text-green-600" />;
      case 'work':
        return <Briefcase size={16} className="text-blue-600" />;
      default:
        return <MapPinned size={16} className="text-purple-600" />;
    }
  };

  const getAddressTypeColor = (type) => {
    switch (type) {
      case 'home':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'work':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
        
        {/* Add Button - Desktop */}
        {!isAdding && !editingId && addresses.length > 0 && (
          <button
            onClick={() => setIsAdding(true)}
            className="hidden md:flex items-center space-x-2 px-4 py-2 bg-[var(--arna-accent)] hover:bg-[#08633d] text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            <Plus size={20} />
            <span>Add Address</span>
          </button>
        )}
      </div>

      {/* Add/Edit Address Form */}
      {(isAdding || editingId) && (
        <div className="address-form bg-white rounded-xl border-2 border-[var(--arna-accent)]/20 p-6 shadow-md">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h3>
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Address Type Selection - Enhanced */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Address Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['home', 'work', 'other'].map((type) => (
                  <label
                    key={type}
                    className={`
                      relative flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all
                      ${formData.addressType === type 
                        ? 'border-[var(--arna-accent)] bg-[var(--arna-accent)]/5' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="addressType"
                      value={type}
                      checked={formData.addressType === type}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`mb-2 ${formData.addressType === type ? 'scale-110' : ''} transition-transform`}>
                      {type === 'home' && <Home size={24} className="text-green-600" />}
                      {type === 'work' && <Briefcase size={24} className="text-blue-600" />}
                      {type === 'other' && <MapPinned size={24} className="text-purple-600" />}
                    </div>
                    <span className="text-sm font-medium text-gray-700 capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Street Address & Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="houseNo"
                  value={formData.houseNo}
                  onChange={handleInputChange}
                  placeholder="House/Flat No., Building Name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--arna-accent)]/20 focus:border-[var(--arna-accent)] outline-none transition-all text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area/Locality <span className="text-red-500">*</span>
                </label>
                <input
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="Area, Colony, Street"
                  className="w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--arna-accent)]/20 focus:border-[var(--arna-accent)] outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* City, State, Pincode */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--arna-accent)]/20 focus:border-[var(--arna-accent)] outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  className="w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--arna-accent)]/20 focus:border-[var(--arna-accent)] outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="6-digit pincode"
                  maxLength="6"
                  pattern="[0-9]{6}"
                  className="w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--arna-accent)]/20 focus:border-[var(--arna-accent)] outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Landmark - Optional */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Landmark <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                placeholder="Nearby landmark for easy identification"
                className="w-full px-4 py-2.5 border text-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--arna-accent)]/20 focus:border-[var(--arna-accent)] outline-none transition-all"
              />
            </div>

            {/* Default Address Checkbox */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onChange={(e) =>
                  setFormData({ ...formData, isDefault: e.target.checked })
                }
                className="w-4 h-4 text-[var(--arna-accent)] border-gray-300 rounded focus:ring-[var(--arna-accent)]"
              />
              <label htmlFor="isDefault" className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
                Set as default delivery address
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <X size={18} />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-[var(--arna-accent)] hover:bg-[#08633d] text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-sm"
              >
                <Check size={18} />
                <span>{editingId ? "Update Address" : "Save Address"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Addresses List */}
      <div className="space-y-4">
        {/* Add New Button - Mobile/Empty State */}
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center space-x-2 p-5 border-2 border-dashed border-gray-300 rounded-xl hover:border-[var(--arna-accent)] hover:bg-[var(--arna-accent)]/5 transition-all group md:hidden"
          >
            <Plus size={20} className="text-gray-400 group-hover:text-[var(--arna-accent)] transition-colors" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-[var(--arna-accent)] transition-colors">
              Add New Address
            </span>
          </button>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-[var(--arna-accent)]"></div>
            <p className="text-gray-500 mt-3 text-sm">Loading addresses...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && addresses.length === 0 && !isAdding && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved yet</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Add your delivery addresses to make checkout faster and easier
            </p>
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[var(--arna-accent)] hover:bg-[#08633d] text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              <Plus size={20} />
              <span>Add Your First Address</span>
            </button>
          </div>
        )}

        {/* Existing Addresses */}
        {addresses.map((address) => (
          <div
            key={address._id}
            className={`
              group bg-white border-2 rounded-xl p-5 shadow-sm hover:shadow-md transition-all
              ${address.isDefault ? 'border-[var(--arna-accent)]/30 bg-[var(--arna-accent)]/5' : 'border-gray-200 hover:border-[var(--arna-accent)]/20'}
            `}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                {/* Address Type & Default Badge */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-md text-xs font-medium ${getAddressTypeColor(address.addressType)}`}>
                    {getAddressIcon(address.addressType)}
                    <span className="capitalize">{address.addressType}</span>
                  </span>
                  {address.isDefault && (
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-md border border-blue-200">
                      Default
                    </span>
                  )}
                </div>

                {/* Address Details */}
                <p className="text-base font-semibold text-gray-900 mb-2">
                  {address.houseNo}, {address.area}
                </p>
                <p className="text-gray-700 mb-1">
                  {address.city}, {address.state} - {address.pincode}
                </p>
                {address.landmark && (
                  <p className="text-sm text-gray-500 flex items-start gap-1.5 mt-2">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                    <span>{address.landmark}</span>
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 md:ml-4">
                <button
                  onClick={() => handleEdit(address)}
                  className="flex items-center gap-1.5 px-3 py-2 text-gray-600 hover:text-[var(--arna-accent)] hover:bg-[var(--arna-accent)]/10 rounded-lg transition-all text-sm font-medium"
                  title="Edit address"
                >
                  <Edit3 size={16} />
                  <span className="hidden sm:inline">Edit</span>
                </button>
                
                {deleteConfirmId === address._id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(address._id)}
                      className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(address._id)}
                    className="flex items-center gap-1.5 px-3 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all text-sm font-medium"
                    title="Delete address"
                  >
                    <Trash2 size={16} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}