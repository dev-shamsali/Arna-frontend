import CartPageContent from '@/components/cart/CartPageContent'
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import React from 'react'

const page = () => {
  return (
    <div>
     <Navbar/>   
    <CartPageContent/>
    
    {/* <Footer/> */}
    </div>
  )
}

export default page