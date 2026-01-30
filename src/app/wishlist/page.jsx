
    import Footer from '@/components/layout/footer'
    import Navbar from '@/components/layout/navbar'
    import { WishlistProvider } from '@/components/wishlist/WishlistContext.jsx'
import WishlistPage from '@/components/wishlist/WishlistPage'
    import React from 'react'

    const page = () => {
    return (
        <div>
        <Navbar />
        <WishlistPage/>
        <Footer/>
        </div>

    )
    }

export default page