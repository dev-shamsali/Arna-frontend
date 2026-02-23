"use client";

import { useState } from "react";
import { HelpCircle, Search, ChevronDown } from "lucide-react";
import {useRouter} from "next/navigation";
export default function HelpSection() {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const faqs = [  
    {
      id: 1,
      question: "How do I track my order?",
      answer: "You can track your order from the 'My Orders' section in your account. Click on any order to view its current status and estimated delivery date."
    },
    {
      id: 2,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all products. Items must be unused, in original packaging, and returned with proof of purchase. Contact support to initiate a return."
    },
    {
      id: 3,
      question: "How do I change or cancel my order?",
      answer: "Orders can be modified or cancelled within 2 hours of placement. After that, we begin processing and cannot make changes. Check 'Your Orders' for status."
    },
    {
      id: 4,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and popular wallets like Paytm, PhonePe, and Google Pay through Razorpay."
    },
    {
      id: 5,
      question: "How long does delivery take?",
      answer: "Standard delivery takes 3-7 business days across India. Express delivery (additional charge) takes 1-3 business days. Delivery times may vary by location."
    },
    {
      id: 6,
      question: "How do I contact customer support?",
      answer: "Reach us via email at support@arna.com, WhatsApp at +91 9082742221 or through the chat bubble on our website (10 AM - 8 PM IST)."
    },
    {
      id: 7,
      question: "Is my payment information secure?",
      answer: "Yes, all payments are processed through Cashfree compliant gateway with 256-bit SSL encryption. Your data is never stored on our servers."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <HelpCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Help & Support
            </h2>
            <p className="text-sm text-gray-500">
              Get assistance with your account, orders, and general inquiries.
            </p>
          </div>
        </div>

        {/* Apply for Refund Button */}
        <button
          onClick={() => router.push("/contact")}
          className="px-5 py-2.5 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all duration-200"
        >
          Apply for Refund
        </button>
      </div>

      {/* Search */}
      {/* <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />
        </div>
      </div> */}

      {/* FAQs */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <HelpCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No FAQs found</h3>
            <p className="text-sm text-gray-500 mb-6">
              Try searching with different keywords or contact support directly.
            </p>
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
              Contact Support
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${openFaq === faq.id ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {openFaq === faq.id && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Contact Support CTA */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-6 text-center">
        <HelpCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Still need help?</h3>
        <p className="text-sm text-gray-600 mb-6">
          Our support team is here 24/7 to assist you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2">
            <span>Chat with us</span>
          </button>
          <button className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors">
            Email Support
          </button>
        </div>
      </div>
    </div>
  );
}
