'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

const MIN_VISIBLE_TIME = 1500
const FADE_OUT_DURATION = 1000

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
      {/* BASE DARK GREEN + BLACK BACKGROUND */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          bg-gradient-to-br
          from-black
          via-emerald-950
          to-black
        "
      />

      {/* SOFT RADIAL DEPTH (CONSISTENT WITH SITE) */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          opacity-40
          bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.18),transparent_55%)]
        "
      />

      {/* SECONDARY DEPTH GLOW */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          opacity-25
          bg-[radial-gradient(circle_at_50%_65%,rgba(5,150,105,0.22),transparent_65%)]
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
          loading="eager"
          fetchPriority="high"
          decoding="async"
          unoptimized
          sizes="(max-width: 768px) 60vw, 480px"
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
            text-sm sm:text-base
            tracking-[0.35em]
            text-emerald-100/80
          "
        >
          Created by Nature
        </p>
      </div>
    </div>
  )
}
