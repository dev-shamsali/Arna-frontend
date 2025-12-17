import ContactPage from '@/components/contact/contactForm'
import Navbar from '@/components/layout/navbar'
import Location from '@/components/contact/location'
import React from 'react'
import Footer from '@/components/layout/footer'

const page = () => {
  return (
    <div>
        <Navbar/>
      <ContactPage/>
      <Location/>
      {/* <Footer/> */}
    </div>
  )
}

export default page
