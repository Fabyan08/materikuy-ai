'use client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Navbar from '@/components/navbar'
import { SessionProvider } from 'next-auth/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Template({children}: any) {
    return (
        <>
        <SessionProvider>
            <Navbar />
        </SessionProvider>
        <ProgressBar
            color='#2B243C'
        />
        <ToastContainer />
        {children}
        </>
    )
}
