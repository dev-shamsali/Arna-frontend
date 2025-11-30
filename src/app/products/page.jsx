import React from 'react'
import ProductsPage from "../../components/products/products"
import Navbar from '@/components/layout/navbar'
const page = () => {
  return (
    <div>
        <Navbar solid />
        <ProductsPage/>

        </div>
  )
}

export default page