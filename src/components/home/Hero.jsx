'use client'

import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useGetHomeHeroQuery } from '@/redux/slices/cmsSlice'

const DEFAULT_SLIDES = [
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
  const [isPaused, setIsPaused] = useState(false)
  const [currentSlides, setCurrentSlides] = useState(DEFAULT_SLIDES)

  const { data: apiData, isLoading } = useGetHomeHeroQuery()

  useEffect(() => {
    if (apiData?.success && apiData?.data?.length > 0) {
      // Map API data to slide format
      const backendSlides = apiData.data.map(slide => ({
        image: slide.imageUrl.startsWith('http')
          ? slide.imageUrl
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}${slide.imageUrl}`,
        title: slide.title,
        text: slide.description,
        mediaType: slide.mediaType || 'image'
      }))
      console.log("Here is the backend slies", backendSlides);
      // Use backend slides if available, otherwise fallback to defaults
      setCurrentSlides(backendSlides.length > 0 ? backendSlides : DEFAULT_SLIDES)
    }
  }, [apiData])

  useLayoutEffect(() => {
    if (!loaded || currentSlides.length === 0) return

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    // Initial setup
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

    const tl = gsap.timeline({
      repeat: -1,
      delay: 3.5,
      paused: false,
    })

    timelineRef.current = tl

    currentSlides.forEach((_, i) => {
      const current = i
      const next = (i + 1) % currentSlides.length

      tl.addLabel(`slide${i}`)
        .to({}, { duration: 4 })
        .to([titleRef.current, textRef.current, buttonsRef.current], {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: 'power2.in',
        }, '>')
        .set(slidesRef.current[next], {
          x: '100%',
          opacity: 1,
          visibility: 'visible',
          zIndex: 10,
        }, '<0.1')
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
        .call(() => {
          setActive(next)
        }, null, '<0.7')
        .set(slidesRef.current[current], {
          zIndex: 1,
        }, '>')
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
  }, [loaded, currentSlides])

  const togglePause = () => {
    if (!timelineRef.current) return;
    if (timelineRef.current.paused()) {
      timelineRef.current.play();
      setIsPaused(false);
    } else {
      timelineRef.current.pause();
      setIsPaused(true);
    }
  };

  const setManualPause = (pause) => {
    if (!timelineRef.current) return;
    if (pause) {
      timelineRef.current.pause();
      setIsPaused(true);
    } else {
      timelineRef.current.play();
      setIsPaused(false);
    }
  };

  if (isLoading && !loaded) {
    return (
      <section className="relative h-screen w-full bg-[#14532d] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#b77f6b] border-t-transparent rounded-full animate-spin"></div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a2e1a] via-[#14532d] to-[#0a2e1a]"
    >
      <div className="absolute inset-0 w-full h-full">
        {currentSlides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => (slidesRef.current[i] = el)}
            className="absolute top-0 left-0 w-full h-full"
            style={{ willChange: 'transform' }}
          >
            <div
              className="relative w-full h-full cursor-pointer"
              onMouseEnter={() => setManualPause(true)}
              onMouseLeave={() => setManualPause(false)}
              onClick={togglePause}
            >
              {slide.mediaType === 'video' ? (
                <video
                  src={slide.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  onLoadedData={() => setLoaded(true)}
                />
              ) : (
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={i === 0}
                  unoptimized
                  className="object-cover"
                  onLoad={() => setLoaded(true)}
                  onError={() => setLoaded(true)}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e1a]/40 via-transparent to-black/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-20 h-full flex items-center pt-20 md:pt-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl lg:max-w-3xl text-white text-center md:text-left">
            <h1
              ref={titleRef}
              className="font-serif text-3xl md:text-5xl lg:text-7xl leading-tight font-medium mb-4 drop-shadow-xl"
            >
              {currentSlides[active]?.title}
            </h1>

            <p
              ref={textRef}
              className="text-sm sm:text-lg text-white/90 max-w-xl mx-auto md:mx-0 leading-relaxed mb-8 md:mb-10 font-light drop-shadow-md"
            >
              {currentSlides[active]?.text}
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-10 md:mb-12">
              <Link
                href="/products"
                className="w-full sm:w-auto group px-6 py-3.5 md:px-8 md:py-4 bg-[#b77f6b] text-white font-bold rounded-xl transition-all hover:bg-[#8e5d4d] hover:scale-105 shadow-xl hover:shadow-[#b77f6b]/20 flex items-center justify-center md:justify-start"
              >
                Explore Products →
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto group px-6 py-3.5 md:px-8 md:py-4 border-2 border-white/80 text-white font-bold rounded-xl hover:bg-white hover:text-[#0a2e1a] transition-all backdrop-blur-sm hover:scale-105 flex items-center justify-center md:justify-start"
              >
                Our Philosophy
              </Link>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="flex gap-4">
                {currentSlides.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-700 ${i === active
                      ? 'w-16 bg-[#b77f6b] shadow-lg shadow-[#b77f6b]/50'
                      : 'w-8 bg-white/30'
                      }`}
                  />
                ))}
              </div>

              {/* Pause Indicator */}
              {isPaused && (
                <div className="ml-4 flex items-center gap-2 text-white/60 text-[10px] uppercase tracking-widest animate-pulse">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#b77f6b]" />
                  Paused
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
