import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="fixed w-full z-20 py-4 backdrop-blur border-b border-b-gray-300 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <aside className="flex items-center text-sm">
                    <Image 
                        src="/icons/logo.png"
                        alt="logo"
                        width={160}
                        height={60}
                        className="mr-14"
                    />
                    <p className="mr-8"><Link href="/">Beranda</Link></p>
                    <p><Link href="/">Rekomendasi Belajar</Link></p>
                </aside>
                <aside>
                    <div className="bg-[#5C71D2] p-2 rounded-2xl">
                        <Image src="/icons/user_icon.png" alt="user" width={32} height={32} />
                    </div>
                </aside>
            </div>
        </nav>
    );
}

export default Navbar;
