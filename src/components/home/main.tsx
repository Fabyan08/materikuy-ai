import Image from "next/image";
import Ripple from "../ripple";
import FeedbackCard from "./feedback_card";
import Link from "next/link";

const Main = () => {
  return (
    <div className="relative flex h-[960px] w-full flex-col items-center justify-center overflow-hidden">
      <p className="md:text-[56px] text-2xl text-center font-semibold font-urbanis w-[500px] leading-none mb-3">
        Buat Materi Belajarmu Sendiri
      </p>
      <p className="md:text-[80px] text-5xl text-center font-bold font-space-grotes md:w-[890px] md:leading-none mb-10">
        Terbaru, Praktis, Paling Efektif
      </p>
      <Link
        href="/generate-materi"
        className="relative z-10 flex items-center bg-[#2B243C] py-3 px-6 rounded-full font-space-grotes"
      >
        <Image
          src="/icons/magic.png"
          alt="magic"
          width={40}
          height={40}
          className="mr-4"
        />
        Mau Belajar Apa Hari Ini?
      </Link>
      <FeedbackCard
        position="top-36 md:left-[250px] left-[100px]"
        pp="orang1.png"
        comment="Keren bangett AI nya ngebantu"
        role="Mahasiswa"
        name="Adi Satriyo"
      />
      <FeedbackCard
        position="top-[240px] right-[300px] hidden md:flex"
        pp="orang2.png"
        comment="Belajar jadi ngebuuttt!!"
        role="Mahasiswa"
        name="Axel Fabrio"
      />
      <FeedbackCard
        position="top-[700px] md:top-[580px] md:left-[280px]"
        pp="orang3.png"
        comment="Belajar jadi gampang banget"
        role="Mahasiswa"
        name="Siti Labelle"
      />
      <FeedbackCard
        position="top-[550px] right-[340px] hidden md:flex"
        pp="orang4.png"
        comment="Bagus banget bintang 999"
        role="Mahasiswa"
        name="Riany Elizabeth"
      />
      <Ripple />
    </div>
  );
};

export default Main;
