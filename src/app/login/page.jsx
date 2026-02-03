import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import SignInForm from "@/components/login/SignInForm";
import React from 'react'

const LoginPage = () => {
    return (
        <div>
            <Navbar solid />
            <SignInForm />
            <Footer />

        </div>
    )
}

export default LoginPage
