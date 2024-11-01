'use client'

import Ripple from "@/components/ripple";
import Image from "next/image";
import { generateMateri } from "./actions";
import { useState } from "react";
import Markdown from 'react-markdown';
import Lottie from "lottie-react";
import LoadingLottie from "./loading.json";

export default function GenerateMateri() {
    const [isGenerated, setIsGenerated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState("")
    const [formData, setFormData] = useState({
        materi_apa: "",
        tingkat: "",
        durasi_belajar: "",
        desc_belajar: "",
    });

    const handleGenerateMateri = async (e: any) => {
        e.preventDefault()
        setIsGenerated(false)
        setIsLoading(true)

        const form = new FormData(e.currentTarget);
        const result = await generateMateri(form);
        setFormData({
            materi_apa: form.get("materi_apa") as string,
            tingkat: form.get("tingkat") as string,
            durasi_belajar: form.get("durasi_belajar") as string,
            desc_belajar: form.get("desc_belajar") as string,
        });

        setIsLoading(false)
        setResult(result)
        setIsGenerated(true)
    }

    return (
        <div className="relative flex pt-32 pb-16 w-full flex-col items-center justify-center overflow-hidden text-white">
            <button className="relative z-10 flex items-center bg-[#2B243C] py-3 px-6 rounded-full font-space-grotes mb-8">
                <Image src="/icons/magic.png" alt="magic" width={40} height={40} className="mr-4" />
                Mau Belajar Apa Hari Ini?
            </button>
            {
                isLoading ? <Lottie animationData={LoadingLottie} loop={true} width={100} className="relative z-10" />
                    :
                (
                isGenerated ?
                <div className="bg-white w-full py-16 font-urbanis rounded-t-[100px] relative z-10">
                    <Markdown className="text-start text-[#33313B] mx-auto prose lg:prose-xl">{result}</Markdown>
                </div>
                :
                <form onSubmit={handleGenerateMateri} className="font-urbanis relative z-10 container">
                    <div className="flex flex-col mb-10">
                        <label htmlFor="belajar_apa" className="text-2xl font-bold mb-2">Belajar materi apa?</label>
                        <input type="text" id="belajar_apa" name='materi_apa' className="bg-[#D9D9D9] rounded-2xl p-4 text-black font-medium text-lg duration-200 focus:outline-2 focus:outline-purple-600" />
                    </div>
                    <div className="flex mb-12">
                        <div className="flex flex-col flex-1 mr-16">
                            <label htmlFor="tingkatan" className="text-2xl font-bold mb-2">Kamu ada ditingkat apanihh?</label>
                            <select id="tingkatan" name='tingkat' className="bg-[#D9D9D9] rounded-2xl p-4 text-black font-medium text-lg duration-200 focus:outline-2 focus:outline-purple-600">
                                <option value="Pemula">Pemula</option>
                                <option value="Sedang">Sedang</option>
                                <option value="Sepuh">Sepuh</option>
                            </select>
                        </div>
                        <div className="flex flex-col flex-1">
                            <label htmlFor="berapa_lama" className="text-2xl font-bold mb-2">Kira-kira mau belajar berapa lama?</label>
                            <select id="berapa_lama" name='durasi_belajar' className="bg-[#D9D9D9] rounded-2xl p-4 text-black font-medium text-lg duration-200 focus:outline-2 focus:outline-purple-600">
                                <option value="Satu Hari">Satu Hari</option>
                                <option value="Seminggu">Seminggu</option>
                                <option value="Satu Bulan">Satu Bulan</option>
                            </select>
                        </div>
                    </div>
                    <div className="border mb-10"></div>
                    <div className="flex flex-col mb-14">
                        <label htmlFor="deskripsiin" className="text-2xl font-bold mb-2">Deskripsiin lagi dongg, tujuan kamu belajar ini supaya apa?</label>
                        <textarea id="deskripsiin" name='desc_belajar' rows={10} className="bg-[#D9D9D9] rounded-2xl p-4 text-black font-medium text-lg duration-200 focus:outline-2 focus:outline-purple-600"></textarea>
                    </div>
                    <button type='submit' className="text-lg py-5 px-12 rounded-full bg-gradient-to-r from-[#99A6D5] to-[#5B75FE] mx-auto block font-bold shadow-lg shadow-[#EC27B6] shadow-button">Belajar Sekarang</button>
                </form>
                )
            }
            <Ripple />
        </div>
    );
};
