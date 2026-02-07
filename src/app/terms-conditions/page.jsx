import React from 'react'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import TermsConditionsContent from '@/components/policies/T&CPolicy'


export const metadata = {
  title: 'Terms & Conditions | Arna Skincare',
  description:
    'These terms and conditions govern the use of the Arna Skincare website and services.',
}


export default function TermsConditionspage() {
    return (
        <main>
            <Navbar solid={true} />
            <TermsConditionsContent/>
            <Footer />
        </main>
    )
}
