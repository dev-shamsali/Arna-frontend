'use client'

import { useState } from 'react'
import IntroLoader from '@/components/ui/IntroLoader'

import Navbar from '@/components/layout/navbar'
import Hero from '@/components/home/Hero'
import BestProduct from '@/components/home/bestproduct'
import About from '@/components/home/about'
import ProductGrid from '@/components/home/ProductGrid'
import OurStory from '@/components/home/owner'
import Testimonials from '@/components/home/testimonial'
import Footer from '@/components/layout/footer'

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false)

  return (
    <>
      {/* Loader overlays content */}
      <IntroLoader onFinish={() => setLoaderDone(true)} />

      {/* Website ALWAYS mounted */}
      <main
        className={`
          transition-opacity duration-1000
          ${loaderDone ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <Navbar />
        <Hero />
        <BestProduct />
        <About />
        <ProductGrid />
        <OurStory />
        <Testimonials />
        <Footer />
      </main>
    </>
  )
}
