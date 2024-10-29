import Image from "next/image";
import Ripple from "../ripple";
import FeedbackCard from "./feedback_card";

const Main = () => {
    return (
        <div className="relative flex h-[960px] w-full flex-col items-center justify-center overflow-hidden">
            <p className="text-[56px] text-center font-semibold font-urbanis w-[500px] leading-none mb-3">Buat Materi Belajarmu Sendiri</p>
            <p className="text-[80px] text-center font-bold font-space-grotes w-[890px] leading-none mb-10">Terbaru, Praktis, Paling Efektif</p>
            <button className="relative z-10 flex items-center bg-[#2B243C] py-3 px-6 rounded-full font-space-grotes">
                <Image src="/icons/magic.png" alt="magic" width={40} height={40} className="mr-4" />
                Mau Belajar Apa Hari Ini?
            </button>
            <FeedbackCard position="top-36 left-[250px]" pp="orang1.png" comment="Keren bangett AI nya ngebantu" role="Mahasiswa" name="Adi Satriyo" />
            <FeedbackCard position="top-[240px] right-[300px]" pp="orang2.png" comment="Belajar jadi ngebuuttt!!" role="Mahasiswa" name="Axel Fabrio" />
            <FeedbackCard position="top-[580px] left-[280px]" pp="orang3.png" comment="Belajar jadi gampang banget" role="Mahasiswa" name="Siti Labelle" />
            <FeedbackCard position="top-[550px] right-[340px]" pp="orang4.png" comment="Bagus banget bintang 999" role="Mahasiswa" name="Riany Elizabeth" />
            <Ripple />
        </div>
    );
};

export default Main;
