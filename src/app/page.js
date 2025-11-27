import About from '@/components/home/about'
import BestProduct from '@/components/home/bestproduct'
import Hero from '@/components/home/Hero'
import Navbar from '@/components/layout/navbar'
// import ProductGrid from '@/components/home/ProductGrid'

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero />
      <BestProduct/>
      <About/>
      {/* <ProductGrid /> */}
    </main>
  )
}
