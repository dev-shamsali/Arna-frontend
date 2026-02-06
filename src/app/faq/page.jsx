import Footer from '@/components/layout/footer'
import FAQContent from '@/components/policies/FAQ'
import Navbar from '@/components/layout/navbar'

import React from 'react'

export const metadata = {
  title: 'FAQ | Arna Skincare',
  description:
    'Find answers to common questions about Arna Skincare products, orders, shipping, and policies.',
}


export default function FAQPage() {
  return (
    <main>
        <Navbar solid={true} />
        <FAQContent/>
        <Footer/>
    </main>
  )
}
