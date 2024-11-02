'use client'
import { signIn } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import {useState} from 'react'
import { toast } from 'react-toastify';
import Ripple from "@/components/ripple";
import Image from "next/image";
import Link from "next/link";
import SpinnerLoadIcon from '../../../../public/icons/spinnerloadicon'

export default function SignUp() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({
        name: '',
        email: '',
        no_hp: '',
        password: ''
    })

    const signUpUser = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await axios.post('/api/signup', data)
            await signIn('credentials', {
                ...data,
                redirect: false
            })
            setIsLoading(false)
            toast.success('Selamat datang 🤩🎉', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            router.replace('/dashboard')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response.data === 'User already exists') {
                setIsLoading(false)
                toast.error('Email sudah digunakan 🙏', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }

    return (
        <main className="relative flex pt-28 pb-36 w-full flex-col items-center justify-center overflow-hidden text-white">
            <button className="relative z-10 mx-auto flex items-center bg-[#2B243C] py-3 px-6 rounded-full font-space-grotes mb-10">
                <Image src="/icons/magic.png" alt="magic" width={40} height={40} className="mr-4" />
                Mau Belajar Apa Hari Ini?
            </button>
            <div className="container relative z-10 flex">
                <aside className="bg-[url('/bgauth.png')] bg-cover flex-1 rounded-l-3xl relative flex justify-center items-center">
                    <div className="w-[70%] h-[80%] rounded-3xl border border-white bg-white bg-opacity-30 backdrop-blur p-8">
                        <Image src="/icons/logo.png" alt="logo" width={180} height={100} />
                    </div>
                    <Image src="/buku.png" alt="buku" width={70} height={70} className="absolute bottom-28 left-20" />
                    <Image src="/login-gambar.png" alt="login-gambar" width={380} height={80} className="absolute bottom-0 right-0" />
                </aside>
                <aside className="bg-white bg-opacity-20 backdrop-blur flex-1 rounded-r-3xl font-urbanis pt-10 pl-10 pr-5">
                    <p className="font-bold text-4xl">Selamat Datang 👋🏻</p>
                    <p className="text-xl">Yuk buat akun di sini!</p>
                    <form onSubmit={signUpUser} className="bg-white rounded-3xl translate-y-14 py-10 px-8">
                        <div className="flex flex-col mb-5">
                            <label htmlFor="email" className="text-lg font-medium mb-2 text-black">Masukkan email kamu</label>
                            <input type="email" id="email" name='email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} className="rounded-2xl border border-[#4285F4] p-4 text-black font-medium duration-200 focus:outline-2 focus:outline-purple-600" placeholder="Email" required />
                        </div>
                        <div className="flex mb-5">
                            <div className="flex flex-col flex-1 mr-4">
                                <label htmlFor="username" className="text-lg font-medium mb-2 text-black">Username</label>
                                <input type="text" id="username" name='username' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} className="rounded-2xl border border-[#4285F4] p-4 text-black font-medium duration-200 focus:outline-2 focus:outline-purple-600" placeholder="username" required />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="no_hp" className="text-lg font-medium mb-2 text-black">Nomor HP</label>
                                <input type="text" id="no_hp" name='no_hp' value={data.no_hp} onChange={(e) => setData({...data, no_hp: e.target.value})} className="rounded-2xl border border-[#4285F4] p-4 text-black font-medium duration-200 focus:outline-2 focus:outline-purple-600" placeholder="+62....." required />
                            </div>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="password" className="text-lg font-medium mb-2 text-black">Masukkan password</label>
                            <input type="password" id="password" name='password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} className="rounded-2xl border border-[#4285F4] p-4 text-black font-medium duration-200 focus:outline-2 focus:outline-purple-600" placeholder="Password" required />
                        </div>
                        <p className="text-gray-400 mb-6">Sudah punya akun? <Link href="/auth/signin" className="underline font-semibold text-[#5B75FE]">Masuk disini!</Link></p>
                        <button type='submit' className="w-full text-lg py-5 rounded-2xl bg-gradient-to-r from-[#99A6D5] to-[#5B75FE] font-bold flex justify-center">{isLoading ? <SpinnerLoadIcon /> : 'Daftar'}</button>
                    </form>
                </aside>
            </div>
            <Ripple />
        </main>
    );
};
