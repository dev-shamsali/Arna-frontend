import About from '@/components/home/about'
import BestProduct from '@/components/home/bestproduct'
import Hero from '@/components/home/Hero'
import OurStory from '@/components/home/owner'
import ProductGrid from '@/components/home/ProductGrid'
import Testimonials from '@/components/home/testimonial'
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BestProduct />
      <About />
      <ProductGrid />
      <OurStory />
      <Testimonials />
      <Footer />
    </main>
  )
}
