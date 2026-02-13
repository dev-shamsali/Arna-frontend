// src/components/checkout/CheckoutContent.jsx
"use client";

import { useCart } from "@/components/cart/CartContext";
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useGetMeQuery, useUpdateAddressMutation, useAddAddressMutation, useUpdateMeMutation } from "@/redux/slices/authApislice";
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
];

export default function CheckoutContent() {
  const { cartItems } = useCart();
  const router = useRouter();
  const { data, refetch } = useGetMeQuery();
  const [updateAddress] = useUpdateAddressMutation();
  const [addAddress] = useAddAddressMutation();
  const [updateMe] = useUpdateMeMutation();
  const [currentAddressId, setCurrentAddressId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    addressLine1: "",
    email: "",
    phoneNo: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    addressType: "home",
  });
  const [isEditingAddress, setIsEditingAddress] = useState(true);


  useEffect(() => {
    if (data?.user) {
      const user = data.user;

      if (user.addresses?.length > 0) {
        const defaultAddress =
          user.addresses.find((addr) => addr.isDefault) ||
          user.addresses[0];

        setCurrentAddressId(defaultAddress._id); // 👈 ADD THIS

        setShippingForm({
          fullName: user.name || "",
          email: user.email || "",
          phoneNo: user.phoneNo || "",
          addressLine1: defaultAddress.houseNo || "",
          addressLine2: defaultAddress.area || "",
          city: defaultAddress.city || "",
          state: defaultAddress.state || "",
          postalCode: defaultAddress.pincode || "",
          country: "India",
          addressType: defaultAddress.addressType || "home",
        });

        setIsEditingAddress(false);
      } else {
        setShippingForm((prev) => ({
          ...prev,
          fullName: user.name || "",
          email: user.email || "",
          phoneNo: user.phoneNo || "",
        }));
      }
    }
  }, [data]);


  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );
  const shipping = 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const handlePayNow = async () => {
    console.log("Shipping:", shippingForm);
    console.log("Payment method:", paymentMethod);
    if (paymentMethod === "razorpay") {
      // TODO: call API with cartItems + shippingForm and create Razorpay order
    } else {
      // COD logic
    }
  };

  const handleShippingChange = (field, value) => {
    setShippingForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAddress = async () => {
    try {
      setIsSaving(true);
      const addressPayload = {
        houseNo: shippingForm.addressLine1,
        area: shippingForm.addressLine2,
        city: shippingForm.city,
        state: shippingForm.state,
        pincode: shippingForm.postalCode,
        addressType: shippingForm.addressType,
        isDefault: true,
      };

      // 🔹 1. Update or Add Address
      if (currentAddressId) {
        await updateAddress({
          id: currentAddressId,
          ...addressPayload,
        }).unwrap();
      } else {
        const res = await addAddress(addressPayload).unwrap();
        const newAddress = res.addresses[res.addresses.length - 1];
        setCurrentAddressId(newAddress._id);
      }

      // 🔹 2. Update Profile (name / phone / email)
      const profilePayload = {
        name: shippingForm.fullName,
        phoneNo: shippingForm.phoneNo,
      };

      if (data?.user?.authProvider !== "google") {
        profilePayload.email = shippingForm.email;
      }

      await updateMe(profilePayload).unwrap();
      await refetch();
      setIsEditingAddress(false);
    } catch (err) {
      alert("Failed to save. Please try again.");
      console.error("Error saving address:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddressTypeChange = (type) => {
    const selectedAddress = data?.user?.addresses?.find(
      (addr) => addr.addressType === type
    );

    if (selectedAddress) {
      setCurrentAddressId(selectedAddress._id);

      setShippingForm({
        fullName: data.user.name || "",
        email: data.user.email || "",
        phoneNo: data.user.phoneNo || "",
        addressLine1: selectedAddress.houseNo || "",
        addressLine2: selectedAddress.area || "",
        city: selectedAddress.city || "",
        state: selectedAddress.state || "",
        postalCode: selectedAddress.pincode || "",
        country: "India",
        addressType: selectedAddress.addressType,
      });
    } else {
      // No saved address of this type → clear fields
      setCurrentAddressId(null);
      setShippingForm((prev) => ({
        ...prev,
        addressType: type,
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 pt-20 sm:pt-24 pb-10 sm:pb-14">
        {/* Page heading */}
        <header className="mb-6 flex items-start gap-3">
          {/* Back button */}
          <button
            type="button"
            onClick={() => router.back()} // or router.push("/cart")
            className="mt-1 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-2.5 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div>
            <p className="text-xs tracking-wide text-emerald-500 font-medium uppercase mb-1">
              Checkout
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Complete your purchase
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Secure payment with Razorpay. No extra fees at this step.
            </p>
          </div>
        </header>


        {/* SHIPPING ADDRESS */}
        <section className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Shipping address
            </h2>
            {!isEditingAddress && (
              <button
                type="button"
                onClick={() => setIsEditingAddress(true)}
                className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
              >
                Edit address
              </button>
            )}
          </div>

          {isEditingAddress ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 mb-1">Full name</label>
                  <input
                    type="text"
                    value={shippingForm.fullName}
                    onChange={(e) =>
                      handleShippingChange("fullName", e.target.value)
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition"
                    placeholder="Enter full name"
                    autoComplete="shipping name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Address Type</label>
                  <select
                    value={shippingForm.addressType || "home"}
                    onChange={(e) =>
                      handleAddressTypeChange(e.target.value)
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900"
                  >
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-700 mb-1">
                    Address line 1
                  </label>
                  <input
                    type="text"
                    value={shippingForm.addressLine1}
                    onChange={(e) =>
                      handleShippingChange("addressLine1", e.target.value)
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition"
                    placeholder="House number, street"
                    autoComplete="shipping street-address"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-700 mb-1">
                    Address line 2{" "}
                    <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={shippingForm.addressLine2}
                    onChange={(e) =>
                      handleShippingChange("addressLine2", e.target.value)
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition"
                    placeholder="Apartment, landmark, etc."
                    autoComplete="shipping address-line2"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={shippingForm.phoneNo}
                    onChange={(e) =>
                      handleShippingChange("phoneNo", e.target.value)
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 text-gray-900 rounded-lg"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={shippingForm.email}
                    onChange={(e) =>
                      handleShippingChange("email", e.target.value)
                    }
                    disabled={data?.user?.authProvider === "google"}
                    className={`w-full px-3 py-2.5 border rounded-lg ${data?.user?.authProvider === "google"
                      ? "bg-gray-100 text-gray-900 cursor-not-allowed"
                      : "border-gray-300"
                      }`}
                  />
                  {data?.user?.authProvider === "google" && (
                    <p className="text-xs text-gray-400 mt-1">
                      Email cannot be changed for Google accounts.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={shippingForm.city}
                    onChange={(e) =>
                      handleShippingChange("city", e.target.value)
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">State</label>
                  <select
                    value={shippingForm.state}
                    onChange={(e) =>
                      handleShippingChange("state", e.target.value)
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition"
                  >
                    <option value="">Select state</option>
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">PIN code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    value={shippingForm.postalCode}
                    onChange={(e) =>
                      handleShippingChange(
                        "postalCode",
                        e.target.value.replace(/\D/g, "").slice(0, 6)
                      )
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition"
                    placeholder="6-digit PIN"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={shippingForm.country}
                    onChange={(e) =>
                      handleShippingChange("country", e.target.value)
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <button
                disabled={isSaving}
                onClick={handleSaveAddress}
                className={`mt-4 inline-flex items-center justify-center rounded-full px-4 py-2 text-xs sm:text-sm font-medium bg-emerald-600 text-white transition shadow-sm shadow-emerald-500/30 ${isSaving ? "opacity-60 cursor-not-allowed" : "hover:bg-emerald-700"
                  }`}
              >
                {isSaving ? "Saving..." : "Save address"}
              </button>
            </>
          ) : (
            <div className="text-xs sm:text-sm text-gray-700 space-y-1">
              <p className="font-medium text-gray-900">{shippingForm.fullName}</p>
              {/* Phone */}
              <p>
                <span className="font-medium">Phone:</span> {shippingForm.phoneNo}
              </p>

              {/* Email */}
              <p>
                <span className="font-medium">Email:</span> {shippingForm.email}
              </p>
              <p>{shippingForm.addressLine1}</p>
              {shippingForm.addressLine2 && <p>{shippingForm.addressLine2}</p>}
              <p>
                {shippingForm.city}, {shippingForm.state}{" "}
                {shippingForm.postalCode}
              </p>
              <p>{shippingForm.country}</p>
              <button
                type="button"
                onClick={() => setIsEditingAddress(true)}
                className="mt-3 inline-flex items-center text-xs font-medium text-emerald-600 hover:text-emerald-700"
              >
                Change address
              </button>
            </div>
          )}
        </section>

        {/* PAYMENT */}
        <section className="space-y-6 mb-8">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-b from-emerald-50/40 via-white to-white p-4 sm:p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-1 text-gray-900">Payment</h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">
              All transactions are secure and encrypted.
            </p>

            {/* Razorpay Option */}
            <div
              className={`rounded-xl border p-4 mb-3 cursor-pointer transition-all ${paymentMethod === "razorpay"
                ? "border-emerald-400 bg-emerald-50 shadow-sm"
                : "border-gray-200 bg-white hover:border-emerald-200"
                }`}
              onClick={() => setPaymentMethod("razorpay")}
            >
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                  className="w-4 h-4 accent-emerald-500"
                />
                <span className="text-sm font-medium flex-1 text-gray-900">
                  Razorpay Secure (UPI, Cards, Int&apos;l Cards, Wallets)
                </span>
                <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-600 border border-gray-300 rounded-full px-2 py-0.5">
                    UPI
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-700 border border-emerald-300 rounded-full px-2 py-0.5">
                    VISA
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="w-4 h-4 rounded-full bg-emerald-500" />
                    <div className="w-4 h-4 rounded-full bg-emerald-300 -ml-2" />
                  </div>
                </div>
              </div>

              {paymentMethod === "razorpay" && (
                <div className="mt-3 pt-3 border-t border-gray-200 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-emerald-50/60">
                    <svg
                      className="w-8 h-8 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="16"
                        rx="2"
                        strokeWidth="2"
                      />
                      <path d="M3 8h18" strokeWidth="2" />
                      <path
                        d="M16 12h2"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-600 max-w-xs">
                    After clicking <span className="font-medium">&quot;Pay now&quot;</span>,
                    you&apos;ll be redirected to Razorpay to securely complete your
                    payment.
                  </p>
                </div>
              )}
            </div>

            {/* COD Option */}
            <div
              className={`rounded-xl border p-4 cursor-pointer transition-all ${paymentMethod === "cod"
                ? "border-emerald-400 bg-emerald-50 shadow-sm"
                : "border-gray-200 bg-white hover:border-emerald-200"
                }`}
              onClick={() => setPaymentMethod("cod")}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="w-4 h-4 accent-emerald-500"
                />
                <span className="text-sm font-medium text-gray-900">
                  Cash on Delivery (COD)
                </span>
              </div>
              <p className="mt-1.5 text-[11px] text-gray-500">
                Pay with cash or card when the order is delivered.
              </p>
            </div>
          </div>
        </section>

        {/* ORDER SUMMARY */}
        <section className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 pb-3 border-b text-gray-900">
            Order summary
          </h2>

          <div className="space-y-4 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-medium text-gray-900 leading-snug">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Qty: {item.qty}</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  ₹{(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-gray-600">Shipping</span>
                <svg
                  className="w-3.5 h-3.5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path
                    d="M12 16v-4M12 8h.01"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-gray-500 text-xs">
                {shipping === 0
                  ? "Enter shipping address"
                  : `₹${shipping.toFixed(2)}`}
              </span>
            </div>
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between items-center">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-0.5">INR</div>
              <div className="text-xl font-bold text-gray-900">
                ₹{total.toFixed(2)}
              </div>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">
            Including ₹{tax.toFixed(2)} in taxes
          </p>

          {/* Pay now with shine animation */}
          <button
            onClick={handlePayNow}
            className="relative mt-5 w-full overflow-hidden rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-500/40 transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          >
            <span className="relative z-10">Pay now</span>
            {/* shine overlay */}
            <span
              className="pointer-events-none absolute inset-0 before:absolute before:inset-0 before:rounded-full before:bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.9)_50%,transparent_100%)] before:opacity-0 hover:before:opacity-100 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-[900ms]"
            />
          </button>
        </section>
      </div>
    </div>
  );
}
