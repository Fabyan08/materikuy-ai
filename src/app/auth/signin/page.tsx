import Ripple from "@/components/ripple";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
    return (
        <main className="relative flex pt-28 pb-36 w-full flex-col items-center justify-center overflow-hidden text-white">
            <button className="relative z-10 mx-auto flex items-center bg-[#2B243C] py-3 px-6 rounded-full font-space-grotes mb-10">
                <Image src="/icons/magic.png" alt="magic" width={40} height={40} className="mr-4" />
                Mau Belajar Apa Hari Ini?
            </button>
            <div className="container relative z-10 flex">
                <aside className="bg-white bg-opacity-20 backdrop-blur flex-1 rounded-l-3xl font-urbanis pt-10 pl-10 pr-5">
                    <p className="font-bold text-4xl">Haiii 👋🏻</p>
                    <p className="text-xl">Yuk masuk ke akunmu...</p>
                    <form className="bg-white rounded-3xl translate-y-14 pt-10 px-8">
                        <div className="flex flex-col mb-5">
                            <label htmlFor="email" className="text-lg font-medium mb-2 text-black">Masukkan email yang terdaftar</label>
                            <input type="email" id="email" name='email' className="rounded-2xl border border-[#4285F4] p-4 text-black font-medium duration-200 focus:outline-2 focus:outline-purple-600" placeholder="Email" />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="password" className="text-lg font-medium mb-2 text-black">Masukkan password kamu</label>
                            <input type="password" id="password" name='password' className="rounded-2xl border border-[#4285F4] p-4 text-black font-medium duration-200 focus:outline-2 focus:outline-purple-600" placeholder="Password" />
                        </div>
                        <p className="text-gray-400 mb-6">Belum punya akun? <Link href="/auth/signup" className="underline font-semibold text-[#5B75FE]">Daftar disini!</Link></p>
                        <button type='submit' className="w-full text-lg py-5 rounded-2xl bg-gradient-to-r from-[#99A6D5] to-[#5B75FE] font-bold">Masuk</button>
                        <Image src="/gembok.png" alt="gembok" className="mx-auto translate-y-16" width={200} height={100} />
                    </form>
                </aside>
                <aside className="bg-[url('/bgauth.png')] bg-cover flex-1 rounded-r-3xl relative flex justify-center items-center">
                    <div className="w-[70%] h-[80%] rounded-3xl border border-white bg-white bg-opacity-30 backdrop-blur p-8">
                        <Image src="/icons/logo.png" alt="logo" width={180} height={100} />
                    </div>
                    <Image src="/buku.png" alt="buku" width={70} height={70} className="absolute bottom-28 left-20" />
                    <Image src="/login-gambar.png" alt="login-gambar" width={380} height={80} className="absolute bottom-0 right-0" />
                </aside>
            </div>
            <Ripple />
        </main>
    );
};
