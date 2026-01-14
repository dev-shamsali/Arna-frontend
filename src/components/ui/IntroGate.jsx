'use client'

import { useEffect, useState } from 'react'
import IntroLoader from '@/components/ui/IntroLoader'

export default function IntroGate({ children }) {
    const [showLoader, setShowLoader] = useState(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        const seen = sessionStorage.getItem('arna_intro_seen')

        if (seen) {
            // Already seen → skip loader
            setShowLoader(false)
        } else {
            // First visit → show loader
            sessionStorage.setItem('arna_intro_seen', 'true')
        }
    }, [])

    // Prevent hydration mismatch
    if (!mounted) {
        return null
    }

    return (
        <>
            {showLoader && (
                <IntroLoader onFinish={() => setShowLoader(false)} />
            )}

            <div
                className={`
          transition-opacity duration-1000
          ${showLoader ? 'opacity-0' : 'opacity-100'}
        `}
            >
                {children}
            </div>
        </>
    )
}
