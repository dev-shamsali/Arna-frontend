"use client";
import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  X,
} from "lucide-react";
import { useCreateTicketMutation } from "@/redux/slices/ticketsSlice";

// ─── Success Modal ───────────────────────────────────────────────────────────
function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center text-center z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-5">
          <CheckCircle className="text-green-700" size={36} strokeWidth={1.5} />
        </div>

        {/* Heading */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2 tracking-wide">
          Query Submitted Successfully!
        </h3>

        {/* Message */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Thank you for reaching out. Our team will get back to you shortly.
        </p>

        {/* Divider */}
        <div className="w-full border-t border-gray-100 mb-6" />

        {/* Fallback contact info */}
        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">
          Didn't receive a response?
        </p>
        <p className="text-sm text-gray-600 leading-relaxed mb-1">
          Call or WhatsApp us directly:
        </p>
        <p className="text-green-700 font-semibold text-sm mb-1">
          +91 90827 42221
        </p>
        <p className="text-green-700 font-semibold text-sm">
          +91 80972 48852
        </p>

        <p className="text-xs text-gray-400 mt-3">
          Available daily · 9 AM – 6 PM IST
        </p>

        {/* Close CTA */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2.5 rounded-lg uppercase tracking-wide text-xs transition"
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [createTicket, { isLoading, isSuccess, error }] =
    useCreateTicketMutation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [showModal, setShowModal] = useState(false);

  const isDisabled =
    !formData.name ||
    !formData.email ||
    !formData.subject ||
    !formData.message;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createTicket(formData).unwrap();

      // Show modal instead of alert
      setShowModal(true);

      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Ticket submit error:", err);
      alert(err?.data?.message || "Failed to send message");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Success Modal */}
      {showModal && <SuccessModal onClose={() => setShowModal(false)} />}

      {/* Hero Section with Forest Background */}
      <div className="relative">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-72 sm:h-80 md:h-96"
          style={{
            background: 'url("/contact/ContactBanner.webp") center center / cover no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>

        {/* Hero Text */}
        <div className="relative z-10 pt-20 pb-24 sm:pb-28 md:pb-32 px-4 h-72 sm:h-80 md:h-96 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-white mt-18 sm:mt-20 md:mt-20 lg:mt-2 mb-2 sm:mb-6 tracking-[0.2em]">
              CONTACT US
            </h1>
            <p className="text-white text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light">
              We are here to help you with your skincare journey. Reach out to
              us for any inquiries about our natural ingredients or rituals.
            </p>
          </div>
        </div>

        {/* Contact Card */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20 md:-mt-24 pb-12 sm:pb-16 md:pb-20">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* SEND US A MESSAGE (mobile: on top) */}
              <div className="p-6 sm:p-8 lg:p-12 xl:p-16 order-1 lg:order-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8 tracking-wide">
                  SEND US A MESSAGE
                </h2>
                <div className="space-y-4 sm:space-y-5">
                  {/* Name*/}
                  <div>
                    <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="
      w-full
      border border-gray-300
      rounded
      px-3 py-2
      text-xs sm:text-sm
      bg-white
      text-gray-900
      placeholder-gray-400
      focus:outline-none
      focus:ring-1
      focus:ring-green-700
      transition
    "
                    />
                  </div>

                  {/* Phone and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        PHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="
    w-full
    border border-gray-300
    rounded
    px-3 py-2
    text-xs sm:text-sm
    bg-white
    text-gray-900
    placeholder-gray-400
    focus:outline-none
    focus:ring-1
    focus:ring-green-700
    transition
  "
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="
    w-full
    border border-gray-300
    rounded
    px-3 py-2
    text-xs sm:text-sm
    bg-white
    text-gray-900
    placeholder-gray-400
    focus:outline-none
    focus:ring-1
    focus:ring-green-700
    transition
  "
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      SUBJECT
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-green-700 transition text-gray-600"
                    >
                      <option value="">Select a subject</option>
                      <option value="product">Product Inquiry</option>
                      <option value="order">Order Status</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      MESSAGE
                    </label>
                    <textarea
                      name="message"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="
    w-full
    border border-gray-300
    rounded
    px-3 py-2
    text-xs sm:text-sm
    bg-white
    text-gray-900
    placeholder-gray-400
    focus:outline-none
    focus:ring-1
    focus:ring-green-700
    transition
  "
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isDisabled || isLoading}
                    className={`w-full font-semibold py-2.5 sm:py-3 rounded uppercase tracking-wide text-xs sm:text-sm mt-4 sm:mt-6 transition
    ${isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-700 hover:bg-green-800 text-white"
                      }
  `}
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>

                </div>
              </div>

              {/* GET IN TOUCH (mobile: below) */}
              <div className="p-6 sm:p-8 lg:p-12 xl:p-16 border-t lg:border-t-0 lg:border-r border-gray-200 order-2 lg:order-1">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-5 sm:mb-6 tracking-wide">
                  GET IN TOUCH
                </h2>
                <p className="text-gray-600 mb-8 sm:mb-12 text-xs sm:text-sm leading-relaxed">
                  Have questions about our products or your order? We&apos;re here to
                  assist you daily from 9am to 6pm IST.
                </p>

                {/* Head Office */}
                <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="flex-shrink-0 mt-1">
                    <MapPin className="text-gray-600" size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1.5 sm:mb-2 text-xs sm:text-sm">
                      HEAD OFFICE
                    </h3>
                    <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed">
                      ARNA SKIN Care shop number 03 David Chawl near Saint Joseph
                      English High School opposite Nazar Ali Imam Bada opposite
                      Mansi apartment new Mill road,
                      <br />
                      Kurla, Mumbai 400070
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="flex-shrink-0 mt-1">
                    <Mail className="text-gray-600" size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1.5 sm:mb-2 text-xs sm:text-sm">
                      EMAIL US
                    </h3>
                    <p className="text-gray-600 text-[11px] sm:text-xs">
                      arnaskincare7@gmail.com
                    </p>
                  </div>
                </div>

                {/* Call Us */}
                <div className="flex gap-3 sm:gap-4 mb-8 sm:mb-10">
                  <div className="flex-shrink-0 mt-1">
                    <Phone className="text-gray-600" size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1.5 sm:mb-2 text-xs sm:text-sm">
                      CALL US
                    </h3>
                    <p className="text-gray-600 text-[11px] sm:text-xs">
                      +91 90827 42221
                      <br />
                      +91 80972 48852
                    </p>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 uppercase text-[10px] sm:text-xs tracking-widest">
                    FOLLOW OUR SOCIAL MEDIA
                  </h3>
                  <div className="flex gap-2.5 sm:gap-3">
                    <button className="bg-green-700 text-white p-2.5 sm:p-3 rounded-full hover:bg-green-800 transition duration-300">
                      <Facebook size={16} className="sm:h-[18px] sm:w-[18px]" />
                    </button>
                    <button className="bg-green-700 text-white p-2.5 sm:p-3 rounded-full hover:bg-green-800 transition duration-300">
                      <Instagram size={16} className="sm:h-[18px] sm:w-[18px]" />
                    </button>
                    <button className="bg-green-700 text-white p-2.5 sm:p-3 rounded-full hover:bg-green-800 transition duration-300">
                      <Twitter size={16} className="sm:h-[18px] sm:w-[18px]" />
                    </button>
                    <button className="bg-green-700 text-white p-2.5 sm:p-3 rounded-full hover:bg-green-800 transition duration-300">
                      <Youtube size={16} className="sm:h-[18px] sm:w-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}