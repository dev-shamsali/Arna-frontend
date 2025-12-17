import React from 'react'
import ProductsPage from "../../components/products/products"
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
const page = () => {
  return (
    <div>
        <Navbar />
        <ProductsPage/>
        {/* <Footer /> */}
        </div>
        
  )
}

export default page