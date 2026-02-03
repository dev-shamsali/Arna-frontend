import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import SignUpForm from "@/components/signup/SignUpForm";
import React from 'react'

const SignUpPage = () => {
    return (
        <div>
            <Navbar solid />
            <SignUpForm />
            <Footer />

        </div>
    )
}

export default SignUpPage
