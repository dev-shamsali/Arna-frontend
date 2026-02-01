import React, { useState, useEffect } from 'react';
import { useGetPopupPromoQuery } from '@/redux/slices/cmsSlice'; // Update with your actual slice path

/**
 * PromoPopupModal Component
 * 
 * Production-ready promo popup for e-commerce system
 * Supports two promo types: STANDARD and IMAGE
 * Features: clipboard copy, confetti animation, responsive design
 */
const PromoPopupModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [confettiShown, setConfettiShown] = useState(false);

    // Fetch popup promo from backend
    const { data, isLoading, isError } = useGetPopupPromoQuery();
    const promo = data?.data;


    // Open modal when promo data is available and showAsPopup is true
    useEffect(() => {
        if (promo?.showAsPopup && promo?.isActive && !isOpen) {
            setIsOpen(true);
            setConfettiShown(false);
        }
    }, [promo]);


    // Trigger confetti animation once when modal opens
    useEffect(() => {
        if (isOpen && !confettiShown) {
            triggerConfetti();
            setConfettiShown(true);
        }
    }, [isOpen, confettiShown]);

    // Don't render if no promo or showAsPopup is false
    if (isLoading || isError || !promo || !promo.showAsPopup || !promo.isActive || !isOpen) {
        return null;
    }


    const {
        promoType,
        title,
        description,
        discountType,
        discountValue,
        promoCode,
        bannerImage,
    } = promo;


    /**
     * Copy promo code to clipboard
     * Shows temporary "Copied" feedback
     */
    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(promoCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy promo code:', err);
        }
    };

    /**
     * Close modal and reset states
     */
    const handleClose = () => {
        setIsOpen(false);
        setCopied(false);
    };

    /**
     * Close modal when overlay is clicked
     */
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <>
            {/* Modal Overlay */}
            <div
                className="promo-modal-overlay"
                onClick={handleOverlayClick}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: '16px',
                    animation: 'fadeIn 0.3s ease-out',
                }}
            >
                {/* Modal Container */}
                <div
                    className="promo-modal-container"
                    style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        maxWidth: promoType === 'IMAGE' ? '600px' : '500px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        position: 'relative',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        animation: 'slideUp 0.4s ease-out',
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            border: 'none',
                            outline: 'none',                 // ✅ remove focus outline
                            boxShadow: 'none',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                            transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)')}
                        aria-label="Close modal"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M12 4L4 12M4 4L12 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>

                    {/* STANDARD Promo Type */}
                    {promoType === 'STANDARD' && (
                        <div style={{ padding: '48px 32px 32px' }}>
                            {/* Title */}
                            <h2
                                style={{
                                    fontSize: '28px',
                                    fontWeight: '700',
                                    color: '#111827',
                                    marginBottom: '12px',
                                    lineHeight: '1.3',
                                }}
                            >
                                {title}
                            </h2>

                            {/* Description */}
                            <p
                                style={{
                                    fontSize: '16px',
                                    color: '#6B7280',
                                    marginBottom: '24px',
                                    lineHeight: '1.6',
                                }}
                            >
                                {description}
                            </p>

                            {/* Discount Badge */}
                            {discountValue && (
                                <div
                                    style={{
                                        display: 'inline-block',
                                        padding: '8px 16px',
                                        backgroundColor: '#FEF3C7',
                                        color: '#92400E',
                                        borderRadius: '8px',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        marginBottom: '24px',
                                    }}
                                >
                                    {discountType === 'percentage'
                                        ? `${discountValue}% OFF`
                                        : `₹${discountValue} OFF`}
                                </div>
                            )}


                            {/* Promo Code Section */}
                            <div
                                style={{
                                    backgroundColor: '#F9FAFB',
                                    border: '2px dashed #D1D5DB',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    marginBottom: '24px',
                                }}
                            >
                                <div style={{ marginBottom: '12px' }}>
                                    <span style={{ fontSize: '14px', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                                        Promo Code
                                    </span>
                                    <div
                                        style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: '#111827',
                                            letterSpacing: '1px',
                                            fontFamily: 'monospace',
                                            userSelect: 'all',
                                        }}
                                    >
                                        {promoCode}
                                    </div>
                                </div>

                                {/* Copy Button */}
                                <button
                                    onClick={handleCopyCode}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: copied ? '#10B981' : '#ffffff',
                                        color: copied ? '#ffffff' : '#374151',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!copied) e.target.style.backgroundColor = '#F3F4F6';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!copied) e.target.style.backgroundColor = '#ffffff';
                                    }}
                                >
                                    {copied ? (
                                        <>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                                            </svg>
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M5.5 1A1.5 1.5 0 004 2.5v11A1.5 1.5 0 005.5 15h7a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0012.5 1h-7zm0 1h7a.5.5 0 01.5.5v11a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5zM2 4.5A1.5 1.5 0 013.5 3v11A1.5 1.5 0 012 12.5v-8z" />
                                            </svg>
                                            Copy Promo Code
                                        </>
                                    )}
                                </button>
                            </div>

                        </div>
                    )}

                    {/* IMAGE Promo Type */}
                    {promoType === 'IMAGE' && (
                        <div>
                            {/* Banner Image */}
                            <div style={{ position: 'relative', width: '100%' }}>
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${bannerImage}`}
                                    alt="Promo banner"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                        borderRadius: '16px 16px 0 0',
                                        maxHeight: '400px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>

                            {/* Promo Code Section */}
                            <div style={{ padding: '32px' }}>
                                <div
                                    style={{
                                        backgroundColor: '#F9FAFB',
                                        border: '2px dashed #D1D5DB',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <div style={{ marginBottom: '12px' }}>
                                        <span style={{ fontSize: '14px', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                                            Use Code
                                        </span>
                                        <div
                                            style={{
                                                fontSize: '24px',
                                                fontWeight: '700',
                                                color: '#111827',
                                                letterSpacing: '1px',
                                                fontFamily: 'monospace',
                                                userSelect: 'all',
                                            }}
                                        >
                                            {promoCode}
                                        </div>
                                    </div>

                                    {/* Copy Button */}
                                    <button
                                        onClick={handleCopyCode}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            backgroundColor: copied ? '#10B981' : '#ffffff',
                                            color: copied ? '#ffffff' : '#374151',
                                            border: '1px solid #D1D5DB',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!copied) e.target.style.backgroundColor = '#F3F4F6';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!copied) e.target.style.backgroundColor = '#ffffff';
                                        }}
                                    >
                                        {copied ? (
                                            <>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                                                </svg>
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                    <path d="M5.5 1A1.5 1.5 0 004 2.5v11A1.5 1.5 0 005.5 15h7a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0012.5 1h-7zm0 1h7a.5.5 0 01.5.5v11a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5zM2 4.5A1.5 1.5 0 013.5 3v11A1.5 1.5 0 012 12.5v-8z" />
                                                </svg>
                                                Copy Code
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Confetti Canvas */}
            <canvas
                id="confetti-canvas"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 10000,
                }}
            />

            {/* Inline Styles for Animations */}
            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Mobile Responsive Adjustments */
        @media (max-width: 640px) {
          .promo-modal-container {
            margin: 0 8px;
            max-height: 95vh !important;
          }
        }

        /* Scrollbar Styling */
        .promo-modal-container::-webkit-scrollbar {
          width: 8px;
        }

        .promo-modal-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 8px;
        }

        .promo-modal-container::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 8px;
        }

        .promo-modal-container::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
        </>
    );
};

/**
 * Lightweight confetti animation
 * Creates subtle confetti effect without external libraries
 * Triggers once per popup open
 */
function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiCount = 50; // Subtle amount
    const confettiPieces = [];
    const colors = ['#FCD34D', '#60A5FA', '#F87171', '#34D399', '#A78BFA'];

    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            width: Math.random() * 8 + 4,
            height: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            velocity: Math.random() * 3 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 5 - 2.5,
        });
    }

    let animationId;
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let allFallen = true;

        confettiPieces.forEach((piece) => {
            // Update position
            piece.y += piece.velocity;
            piece.rotation += piece.rotationSpeed;

            // Check if still on screen
            if (piece.y < canvas.height) {
                allFallen = false;
            }

            // Draw confetti piece
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate((piece.rotation * Math.PI) / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
            ctx.restore();
        });

        // Continue animation or cleanup
        if (!allFallen) {
            animationId = requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animationId);
        }
    };

    animate();
}

export default PromoPopupModal;