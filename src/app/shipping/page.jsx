import React from 'react'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import ShippingPolicyContent from '@/components/policies/ShippingPolicy'

export const metadata = {
    title: 'Shipping & Delivery | Arna Skincare',
    description: 'Information about shipping locations, delivery timelines and order tracking.',
}

export default function ShippingPolicyPage() {
    return (
        <main>
            <Navbar solid={true} />
            <ShippingPolicyContent />
            <Footer />
        </main>
    )
}
