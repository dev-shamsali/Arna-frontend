import About from '@/components/home/about'
import BestProduct from '@/components/home/bestproduct'
import Hero from '@/components/home/Hero'
import ProductGrid from '@/components/home/ProductGrid'
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'


export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero />
      <BestProduct/>
      <About/>
      <ProductGrid/>
      {/* <Footer/> */}
    </main>
  )
}
