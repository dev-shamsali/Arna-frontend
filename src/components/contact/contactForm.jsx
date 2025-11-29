"use client";
import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Forest Background */}
      <div className="relative">
        {/* Background Image - Full width, extends down to GET IN TOUCH */}
        <div 
          className="absolute top-0 left-0 w-full h-96"
          style={{
            background: 'url("/contact/pic2.jpeg") center center / cover no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        {/* Hero Text - Centered over image */}
        <div className="relative z-10 pt-20 pb-32 px-4 h-96 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-7xl font-light text-white mb-6 tracking-widest">CONTACT US</h1>
            <p className="text-white text-base max-w-2xl mx-auto leading-relaxed font-light">We are here to help you with your skincare journey. Reach out to us for any inquiries about our natural ingredients or rituals.</p>
          </div>
        </div>

        {/* Contact Card */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 -mt-24 pb-20">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              
              {/* Left Column - GET IN TOUCH */}
              <div className="p-16 border-r border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 tracking-wide">GET IN TOUCH</h2>
                <p className="text-gray-600 mb-12 text-sm leading-relaxed">Have questions about our products or your order? We're here to assist you daily from 9am to 6pm IST.</p>

                {/* Head Office */}
                <div className="flex gap-4 mb-8">
                  <div className="flex-shrink-0 mt-1">
                    <MapPin className="text-gray-600" size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 text-sm">HEAD OFFICE</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">123 Botanical Garden Way,<br />Kurla, Mumbai 400070</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 mb-8">
                  <div className="flex-shrink-0 mt-1">
                    <Mail className="text-gray-600" size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 text-sm">EMAIL US</h3>
                    <p className="text-gray-600 text-xs">hello@arnaskin.com<br />support@arnaskin.com</p>
                  </div>
                </div>

                {/* Call Us */}
                <div className="flex gap-4 mb-12">
                  <div className="flex-shrink-0 mt-1">
                    <Phone className="text-gray-600" size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 text-sm">CALL US</h3>
                    <p className="text-gray-600 text-xs">+1 (800) 123-4567<br />Fax: +1 (800) 123-4568</p>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4 uppercase text-xs tracking-widest">FOLLOW OUR SOCIAL MEDIA</h3>
                  <div className="flex gap-3">
                    <button className="bg-green-700 text-white p-3 rounded-full hover:bg-green-800 transition duration-300">
                      <Facebook size={18} />
                    </button>
                    <button className="bg-green-700 text-white p-3 rounded-full hover:bg-green-800 transition duration-300">
                      <Instagram size={18} />
                    </button>
                    <button className="bg-green-700 text-white p-3 rounded-full hover:bg-green-800 transition duration-300">
                      <Twitter size={18} />
                    </button>
                    <button className="bg-green-700 text-white p-3 rounded-full hover:bg-green-800 transition duration-300">
                      <Youtube size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - SEND US A MESSAGE */}
              <div className="p-16">
                <h2 className="text-2xl font-semibold text-gray-800 mb-8 tracking-wide">SEND US A MESSAGE</h2>
                <div className="space-y-5">
                  
                  {/* Name and Company */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-2">YOUR NAME</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Abdul Aziz"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-green-700 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-2">COMPANY</label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Optional"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-green-700 transition"
                      />
                    </div>
                  </div>

                  {/* Phone and Email */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-2">PHONE NUMBER</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-green-700 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-2">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="abdulw3@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-green-700 transition"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-2">SUBJECT</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-green-700 transition text-gray-600"
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
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-2">MESSAGE</label>
                    <textarea
                      name="message"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-green-700 transition resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-green-700 text-white font-semibold py-3 rounded hover:bg-green-800 transition duration-300 uppercase tracking-wide text-sm mt-6"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}