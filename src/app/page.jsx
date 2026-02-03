'use client'

import Navbar from '@/components/layout/navbar'
import Hero from '@/components/home/Hero'
import TrustBar from '@/components/home/TrustBar'
import ShopByConcern from '@/components/home/ShopByConcern'
import BestProduct from '@/components/home/bestproduct'
import About from '@/components/home/about'
import ProductGrid from '@/components/home/ProductGrid'
import OurStory from '@/components/home/owner'
import Testimonials from '@/components/home/testimonial'
import PromoPopupModal from "@/components/Promo/PromoPopupModal"
import Footer from '@/components/layout/footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <ShopByConcern />
      <BestProduct />
      <About />
      <ProductGrid />
      <OurStory />
      <Testimonials />
      <PromoPopupModal />
      <Footer />
    </>
  )
}
