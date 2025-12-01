import ContactPage from '@/components/contact/contactForm'
import Navbar from '@/components/layout/navbar'
import Location from '@/components/contact/location'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar/>
      <ContactPage/>
      <Location/>
    </div>
  )
}

export default page
