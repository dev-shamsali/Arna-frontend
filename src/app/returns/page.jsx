import React from 'react'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import RefundPolicyContent from '@/components/policies/RefundPolicy'

export const metadata = {
    title: 'Returns & Refunds | Arna Skincare',
    description: 'Our policy on returns, refunds and cancellations for botanical luxury skincare.',
}

export default function RefundPolicyPage() {
    return (
        <main>
            <Navbar solid={true} />
            <RefundPolicyContent />
            <Footer />
        </main>
    )
}
