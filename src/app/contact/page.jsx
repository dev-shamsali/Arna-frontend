"use client"
import ContactPage from '@/components/contact/contactForm'
import Location from '@/components/contact/location'
import React from 'react'
import Footer from '@/components/layout/footer'

const Page = () => {
  return (
    <div>
      <ContactPage />
      <Location />
      <Footer />
    </div>
  )
}

export default Page

