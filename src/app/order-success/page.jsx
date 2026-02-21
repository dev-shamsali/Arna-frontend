"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }

        .success-page {
          font-family: 'Jost', sans-serif;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          background-image:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16, 185, 129, 0.08) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 90% 90%, rgba(16, 185, 129, 0.05) 0%, transparent 60%);
          position: relative;
          overflow: hidden;
          /* Offset for navbar — adjust 64px to match your actual navbar height */
          padding: 80px 16px 40px;
        }

        @media (max-width: 640px) {
          .success-page { padding: 72px 16px 32px; }
        }

        .success-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        /* ── Decorative leaves ────────────────────────── */
        .leaf {
          position: absolute;
          opacity: 0.07;
          pointer-events: none;
        }
        .leaf-1 {
          top: 8%; left: 6%; width: 180px;
          animation: sway 8s ease-in-out infinite;
        }
        .leaf-2 {
          bottom: 10%; right: 5%; width: 140px;
          animation: sway 10s ease-in-out infinite reverse;
        }
        .leaf-3 {
          top: 50%; left: -40px; width: 100px;
          animation: sway 12s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .leaf-1 { width: 120px; opacity: 0.05; }
          .leaf-2 { width: 90px;  opacity: 0.05; }
          .leaf-3 { display: none; }
        }

        @media (max-width: 480px) {
          .leaf-1 { width: 80px; top: 4%; left: 2%; }
          .leaf-2 { width: 70px; bottom: 4%; right: 2%; }
        }

        @keyframes sway {
          0%, 100% { transform: rotate(-5deg) translateY(0); }
          50%       { transform: rotate(5deg)  translateY(-12px); }
        }

        /* ── Card ─────────────────────────────────────── */
        .success-card {
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(16, 185, 129, 0.15);
          border-radius: 4px;
          padding: 56px 64px;
          max-width: 520px;
          width: 100%;
          text-align: center;
          box-shadow:
            0 4px 6px -1px rgba(16, 185, 129, 0.04),
            0 20px 60px -10px rgba(16, 185, 129, 0.1),
            0 1px 0 0 rgba(16, 185, 129, 0.2);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (max-width: 768px) {
          .success-card { padding: 48px 40px; }
        }

        @media (max-width: 480px) {
          .success-card { padding: 40px 24px 36px; border-radius: 6px; }
        }

        .success-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Top accent line */
        .success-card::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 60px; height: 2px;
          background: linear-gradient(90deg, transparent, #10b981, transparent);
        }

        /* ── Checkmark circle ─────────────────────────── */
        .check-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 28px;
          width: 80px; height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.15));
          border: 1px solid rgba(16, 185, 129, 0.25);
          opacity: 0;
          transform: scale(0.7);
          transition: opacity 0.6s 0.3s cubic-bezier(0.34,1.56,0.64,1),
                      transform 0.6s 0.3s cubic-bezier(0.34,1.56,0.64,1);
          flex-shrink: 0;
        }

        @media (max-width: 480px) {
          .check-wrap { width: 68px; height: 68px; margin-bottom: 22px; }
        }

        .success-card.visible .check-wrap { opacity: 1; transform: scale(1); }

        .check-svg { width: 32px; height: 32px; color: #10b981; }

        @media (max-width: 480px) {
          .check-svg { width: 26px; height: 26px; }
        }

        .check-path {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          transition: stroke-dashoffset 0.6s 0.8s ease;
        }

        .success-card.visible .check-path { stroke-dashoffset: 0; }

        /* ── Eyebrow tag ──────────────────────────────── */
        .eyebrow {
          display: inline-block;
          font-family: 'Jost', sans-serif;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #10b981;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 5px 14px;
          border-radius: 2px;
          margin-bottom: 18px;
          opacity: 0;
          transition: opacity 0.6s 0.5s ease;
        }

        .success-card.visible .eyebrow { opacity: 1; }

        /* ── Heading ──────────────────────────────────── */
        .success-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px; font-weight: 300;
          line-height: 1.2; color: #111;
          margin: 0 0 4px;
          letter-spacing: -0.01em;
          opacity: 0;
          transition: opacity 0.6s 0.55s ease;
        }

        @media (max-width: 768px) { .success-heading { font-size: 32px; } }
        @media (max-width: 480px) { .success-heading { font-size: 27px; } }

        .success-heading em { font-style: italic; color: #10b981; }

        .success-card.visible .success-heading { opacity: 1; }

        /* ── Divider ──────────────────────────────────── */
        .divider {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, #10b981, transparent);
          margin: 18px auto;
          opacity: 0;
          transition: opacity 0.6s 0.6s ease;
        }

        .success-card.visible .divider { opacity: 1; }

        /* ── Body copy ────────────────────────────────── */
        .success-body {
          font-size: 14px; font-weight: 300;
          letter-spacing: 0.04em;
          color: #6b7280; line-height: 1.7;
          margin: 0 0 24px;
          opacity: 0;
          transition: opacity 0.6s 0.65s ease;
        }

        @media (max-width: 480px) { .success-body { font-size: 13px; } }

        .success-card.visible .success-body { opacity: 1; }

        /* ── Order ID chip ────────────────────────────── */
        .order-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 3px;
          padding: 10px 18px;
          font-size: 12px;
          letter-spacing: 0.06em;
          color: #374151;
          margin-bottom: 32px;
          opacity: 0;
          transition: opacity 0.6s 0.7s ease;
          max-width: 100%;
          word-break: break-all;
        }

        @media (max-width: 480px) {
          .order-chip { padding: 9px 14px; font-size: 11px; }
        }

        .success-card.visible .order-chip { opacity: 1; }

        .order-chip span.label {
          text-transform: uppercase;
          font-weight: 500; letter-spacing: 0.12em;
          color: #9ca3af; font-size: 10px;
          white-space: nowrap; flex-shrink: 0;
        }

        .order-chip span.value { font-weight: 500; color: #111; }

        /* ── CTA buttons ──────────────────────────────── */
        .btn-group {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          opacity: 0;
          transition: opacity 0.6s 0.75s ease;
        }

        /* Stack on very small screens */
        @media (max-width: 380px) {
          .btn-group { flex-direction: column; align-items: stretch; gap: 10px; }
        }

        .success-card.visible .btn-group { opacity: 1; }

        .btn-primary {
          font-family: 'Jost', sans-serif;
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          background: #10b981; color: white;
          border: none;
          padding: 13px 28px;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
          display: inline-block; text-align: center;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .btn-primary:hover {
          background: #059669;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        @media (hover: none) {
          .btn-primary:hover  { transform: none; box-shadow: none; }
          .btn-primary:active { background: #059669; }
        }

        @media (max-width: 480px) {
          .btn-primary { padding: 12px 22px; }
        }

        .btn-secondary {
          font-family: 'Jost', sans-serif;
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          background: transparent; color: #374151;
          border: 1px solid #d1d5db;
          padding: 13px 28px;
          border-radius: 2px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
          text-decoration: none;
          display: inline-block; text-align: center;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .btn-secondary:hover {
          border-color: #10b981; color: #10b981;
          transform: translateY(-1px);
        }

        @media (hover: none) {
          .btn-secondary:hover  { transform: none; }
          .btn-secondary:active { border-color: #10b981; color: #10b981; }
        }

        @media (max-width: 480px) {
          .btn-secondary { padding: 12px 22px; }
        }

        /* ── Footer note ──────────────────────────────── */
        .footer-note {
          margin-top: 28px; padding-top: 22px;
          border-top: 1px solid #f3f4f6;
          font-size: 11px; letter-spacing: 0.08em;
          color: #d1d5db; text-transform: uppercase;
          opacity: 0;
          transition: opacity 0.6s 0.85s ease;
        }

        .success-card.visible .footer-note { opacity: 1; }

        /* ── Sparkle particles ────────────────────────── */
        .particles {
          position: absolute; inset: 0;
          pointer-events: none; overflow: hidden;
          border-radius: 4px;
        }

        .particle {
          position: absolute;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #10b981; opacity: 0;
        }

        .success-card.visible .particle {
          animation: float-particle 3s ease-out forwards;
        }

        .p1 { top: 20%; left: 15%; animation-delay: 0.9s !important; }
        .p2 { top: 30%; right: 12%; animation-delay: 1.1s !important; width: 3px; height: 3px; }
        .p3 { bottom: 25%; left: 20%; animation-delay: 1.3s !important; width: 2px; height: 2px; }
        .p4 { bottom: 20%; right: 18%; animation-delay: 1.0s !important; }
        .p5 { top: 15%; left: 45%; animation-delay: 1.2s !important; width: 3px; height: 3px; }

        @keyframes float-particle {
          0%   { opacity: 0;   transform: translateY(0)    scale(0); }
          30%  { opacity: 0.6; transform: translateY(-15px) scale(1); }
          100% { opacity: 0;   transform: translateY(-40px) scale(0.5); }
        }
      `}</style>

      <div className="success-page">
        {/* Decorative leaves */}
        <svg className="leaf leaf-1" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 180 C100 180 20 140 20 80 C20 20 100 10 100 10 C100 10 180 20 180 80 C180 140 100 180 100 180Z" fill="#10b981" />
          <path d="M100 10 L100 180" stroke="white" strokeWidth="2" strokeOpacity="0.4"/>
          <path d="M100 60 Q130 80 120 120" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
          <path d="M100 60 Q70 80 80 120"  stroke="white" strokeWidth="1.5" strokeOpacity="0.3" fill="none"/>
        </svg>
        <svg className="leaf leaf-2" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 180 C100 180 20 140 20 80 C20 20 100 10 100 10 C100 10 180 20 180 80 C180 140 100 180 100 180Z" fill="#10b981" />
          <path d="M100 10 L100 180" stroke="white" strokeWidth="2" strokeOpacity="0.4"/>
        </svg>
        <svg className="leaf leaf-3" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 180 C100 180 20 140 20 80 C20 20 100 10 100 10 C100 10 180 20 180 80 C180 140 100 180 100 180Z" fill="#10b981" />
        </svg>

        <div className={`success-card ${visible ? "visible" : ""}`}>
          <div className="particles">
            <div className="particle p1" />
            <div className="particle p2" />
            <div className="particle p3" />
            <div className="particle p4" />
            <div className="particle p5" />
          </div>

          {/* Checkmark */}
          <div className="check-wrap">
            <svg className="check-svg" viewBox="0 0 32 32" fill="none">
              <path
                className="check-path"
                d="M7 16 L13 22 L25 10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="eyebrow">Order Confirmed</div>

          <h1 className="success-heading">
            Thank you for<br /><em>your purchase</em>
          </h1>

          <div className="divider" />

          <p className="success-body">
            Your order has been placed successfully.<br />
            A confirmation email is on its way to you.
          </p>

          {orderId && (
            <div className="order-chip">
              <span className="label">Order</span>
              <span className="value">#{orderId}</span>
            </div>
          )}

          <div className="btn-group">
            <a href="/profile/my-orders" className="btn-primary">Track Order</a>
            <a href="/products" className="btn-secondary">Continue Shopping</a>
          </div>

          <div className="footer-note">Glowskin · Pure &amp; Natural Skincare</div>
        </div>
      </div>
    </>
  );
}