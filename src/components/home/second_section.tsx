import Image from "next/image";

const SecondSection = () => {
    return (
        <div className="bg-[#081225] rounded-t-[60px] font-urbanis mb-20">
            <div className="bg-[#859DBD] bg-opacity-40 py-6 text-center text-gray-300 text-lg font-bold rounded-t-[60px]">
                “Belajar apapun, dimanapun, materi apapun!“
            </div>
            <div className="pt-14">
                <p className="text-center text-2xl font-bold mb-4">Buat materi pembelajaran sesuka kamu...</p>
                <div className="border-2 border-[#FFE1B5] rounded-xl w-[120px] mx-auto mb-24"></div>
                <div className="flex justify-between">
                    <aside className="w-[500px] ml-48">
                        <p className="font-bold text-5xl mb-4">Belajar Lebih Mudah Pakai Materikuy</p>
                        <p className="text-lg leading-snug">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolo</p>
                    </aside>
                    <aside>
                        <Image src="/perpus.png" alt="perpus" className="rounded-tl-[50px] h-[500px] object-cover" width={900} height={300} />
                    </aside>
                </div>
            </div> 
        </div>
    );
};

export default SecondSection;
