import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import AccountPage from '@/components/profile/Content'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar solid />
      <AccountPage />
      <Footer />

    </div>
  )
}

export default page