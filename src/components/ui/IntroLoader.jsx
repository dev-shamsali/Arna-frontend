'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

const MIN_VISIBLE_TIME = 2000 // logo stays visible at least 2s
const FADE_OUT_DURATION = 1000 // smooth fade-out

export default function IntroLoader({ onFinish }) {
    const [hide, setHide] = useState(false)
    const imageLoadedRef = useRef(false)
    const startTimeRef = useRef(Date.now())

    const tryFinish = () => {
        if (!imageLoadedRef.current) return

        const elapsed = Date.now() - startTimeRef.current
        const remaining = Math.max(MIN_VISIBLE_TIME - elapsed, 0)

        setTimeout(() => {
            setHide(true)
            setTimeout(onFinish, FADE_OUT_DURATION)
        }, remaining)
    }

    useEffect(() => {
        const seen = sessionStorage.getItem('arna_intro')

        if (seen) {
            onFinish()
            return
        }

        sessionStorage.setItem('arna_intro', 'true')
    }, [onFinish])

    return (
        <div
            className={`
        fixed inset-0 z-[9999]
        flex items-center justify-center
        transition-opacity duration-[1000ms]
        ${hide ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
        >
            {/* 1. DARK GREEN VIGNETTE (DEPTH) */}
            <div
                className="
          absolute inset-0
          bg-gradient-to-br
          from-[#04120b]
          via-[#0b2a1c]
          to-[#062015]
        "
            />

            {/* 2. NEUTRAL SPOTLIGHT (LOGO VISIBILITY – MOST IMPORTANT) */}
            <div
                className="
          absolute inset-0
          bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.16),transparent_55%)]
        "
            />

            {/* 3. SOFT GREEN ATMOSPHERE (SUBTLE HERBAL FEEL) */}
            <div
                className="
          absolute inset-0
          bg-[radial-gradient(circle_at_50%_60%,rgba(60,140,100,0.12),transparent_70%)]
        "
            />

            {/* CONTENT */}
            <div
                className={`
          relative z-10
          flex flex-col items-center text-center
          ${hide ? 'arna-exit' : 'arna-enter'}
        `}
            >
                {/* LOGO */}
                <Image
                    src="/logo1.png"
                    alt="ARNA Logo"
                    priority
                    width={500}
                    height={500}
                    className="
            w-[220px]
            sm:w-[260px]
            md:w-[320px]
            lg:w-[420px]
            xl:w-[480px]
            h-auto
            drop-shadow-[0_0_60px_rgba(0,0,0,0.55)]
          "
                    onLoadingComplete={() => {
                        imageLoadedRef.current = true
                        tryFinish()
                    }}
                />

                {/* TAGLINE */}
                <p
                    className="
            mt-4
            text-sm
            sm:text-base
            tracking-[0.35em]
            text-white/80
          "
                >
                    Created by Nature
                </p>
            </div>
        </div>
    )
}
