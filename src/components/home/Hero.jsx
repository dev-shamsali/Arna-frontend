'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'

const slides = [
  {
    image: '/home/hero/hero-2.jpg',
    title: 'Powered by Botanical Actives',
    text: 'Infused with plant-based extracts that nurture and strengthen your skin.',
  },
  {
    image: '/home/hero/hero-3.jpg',
    title: 'Nature Meets Modern Care',
    text: 'Thoughtfully crafted formulas that balance tradition and science.',
  },
  {
    image: '/home/hero/hero-4.jpg',
    title: 'Fresh. Clean. Balanced.',
    text: 'Minimal, effective skincare designed for everyday confidence.',
  },
  {
    image: '/home/hero/hero-5.jpg',
    title: 'Honest Skincare You Can Trust',
    text: 'No harsh chemicals. No shortcuts. Just clean, conscious beauty.',
  },
]

export default function Hero() {
  const containerRef = useRef(null)
  const slidesRef = useRef([])
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const buttonsRef = useRef(null)
  const timelineRef = useRef(null)
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useLayoutEffect(() => {
    if (!loaded) return

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    // Initial setup - Set all slides in their starting positions
    slidesRef.current.forEach((el, i) => {
      if (el) {
        gsap.set(el, {
          x: i === 0 ? '0%' : '100%',
          opacity: 1,
          visibility: 'visible',
          zIndex: i === 0 ? 10 : 1,
          force3D: true,
        })
      }
    })

    // Initial text fade in
    gsap.set([titleRef.current, textRef.current, buttonsRef.current], { opacity: 0, y: 30 })

    const initialTextTl = gsap.timeline()
    initialTextTl.to([titleRef.current, textRef.current, buttonsRef.current], {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.3,
    })

    // Create main carousel timeline
    const tl = gsap.timeline({
      repeat: -1,
      delay: 3.5, // Wait before starting the loop
      paused: false,
    })

    timelineRef.current = tl

    // Build timeline for all slides
    slides.forEach((_, i) => {
      const current = i
      const next = (i + 1) % slides.length

      // Hold current slide
      tl.addLabel(`slide${i}`)
        .to({}, { duration: 4 })

        // Fade out text
        .to([titleRef.current, textRef.current, buttonsRef.current], {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: 'power2.in',
        }, '>')

        // Prepare next slide (position it off-screen to the right)
        .set(slidesRef.current[next], {
          x: '100%',
          opacity: 1,
          visibility: 'visible',
          zIndex: 10,
        }, '<0.1')

        // Slide current out to left, next in from right (synchronized)
        .to(slidesRef.current[current], {
          x: '-100%',
          duration: 1.4,
          ease: 'power2.inOut',
        }, '>')
        .to(slidesRef.current[next], {
          x: '0%',
          duration: 1.4,
          ease: 'power2.inOut',
        }, '<')

        // Update active index at the midpoint of slide transition
        .call(() => {
          setActive(next)
        }, null, '<0.7')

        // Reset current slide's z-index after it's off-screen
        .set(slidesRef.current[current], {
          zIndex: 1,
        }, '>')

        // Fade in new text
        .set([titleRef.current, textRef.current, buttonsRef.current], { y: 20 }, '<-0.2')
        .to([titleRef.current, textRef.current, buttonsRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power2.out',
        }, '<0.2')
    })

    return () => {
      initialTextTl.kill()
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [loaded])

  // Loading state
  if (!loaded) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-emerald-900/30 via-green-800/20 to-black/40">
        <div className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full">
            <Image
              src={slides[0].image}
              alt={slides[0].title}
              fill
              priority
              loading="eager"
              fetchPriority="high"
              quality={90}
              sizes="100vw"
              className="object-cover"
              onLoad={() => setLoaded(true)}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/45 via-emerald-800/30 to-black/40" />
          </div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-emerald-900/30 via-green-800/20 to-black/40"
    >
      {/* BACKGROUND SLIDES */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => (slidesRef.current[i] = el)}
            className="absolute top-0 left-0 w-full h-full"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={i === 0}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                quality={90}
                sizes="100vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/45 via-emerald-800/30 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Decorative accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-green-400/10 to-transparent blur-3xl pointer-events-none z-[5]" />

      {/* CONTENT */}
      <div className="relative z-20 h-full flex items-center pt-20 md:pt-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl text-white">
            {/* Title */}
            <h1
              ref={titleRef}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-medium tracking-tight mb-4 drop-shadow-lg"
            >
              {slides[active]?.title}
            </h1>

            {/* Text */}
            <p
              ref={textRef}
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl leading-relaxed mb-8 font-light drop-shadow-md"
            >
              {slides[active]?.text}
            </p>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/products"
                className="group px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-105 hover:-translate-y-0.5"
              >
                Explore Products
                <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/about"
                className="group px-6 py-3 border-2 border-white/80 text-white font-semibold rounded-lg hover:bg-white hover:text-green-900 transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:-translate-y-0.5"
              >
                Our Philosophy
                <span className="inline-block ml-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Slide indicators */}
            <div className="flex gap-3">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${i === active
                    ? 'w-12 bg-green-400 shadow-md shadow-green-400/50'
                    : 'w-8 bg-white/40 hover:bg-white/60'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-[5]" />
    </section>
  )
}
