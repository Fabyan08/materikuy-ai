'use client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Navbar from '@/components/navbar'

export default function Template({children}: any) {
    return (
        <>
        <Navbar />
        <ProgressBar
            color='#2B243C'
        />
        <ToastContainer />
        {children}
        </>
    )
}
