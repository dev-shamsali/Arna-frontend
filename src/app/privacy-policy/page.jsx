import Footer from '@/components/layout/footer'
import PrivacyPolicyContent from '@/components/policies/PrivacyPolicy'
import Navbar from '@/components/layout/navbar'

import React from 'react'

export const metadata = {
  title: 'Privacy Policy | Arna Skincare',
  description:
    'This Privacy Policy explains how Arna Skincare collects, uses, and protects your personal information.',
}
export default function PrivacyPolicypage() {
  return (
    <main>
        <Navbar solid={true} />
        <PrivacyPolicyContent/>
        <Footer/>
    </main>
  )
}
