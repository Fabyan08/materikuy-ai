"use client";

import Ripple from "@/components/ripple";
import Image from "next/image";
import { bookmarkMateri, generateMateri } from "./actions";
import { useState } from "react";
import Markdown from "react-markdown";
import Lottie from "lottie-react";
import LoadingLottie from "./loading.json";
import BookmarkIcon from "../../../public/icons/bookmarkicon";
import { toast } from "react-toastify";

export default function GenerateMateri() {
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [formData, setFormData] = useState({
    materi_apa: "",
    tingkat: "Menengah",
    durasi_belajar: "Satu bulan",
    desc_belajar: "",
  });
  const [isBookmarked, setIsBookmarked] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGenerateMateri = async (e: any) => {
    e.preventDefault();
    setIsGenerated(false);
    setIsLoading(true);

    const result = await generateMateri(formData);

    setIsLoading(false);
    setResult(result);
    setIsGenerated(true);
  };

  const handleRegenerateMateri = () => {
    setIsBookmarked(false);
    setFormData({
      materi_apa: "",
      tingkat: "Menengah",
      durasi_belajar: "Satu bulan",
      desc_belajar: "",
    });
    setIsGenerated(false);
  };

  const handleBookmark = async () => {
    const resultBookmark = await bookmarkMateri(formData, result);

    if (resultBookmark == "gak login") {
      toast.error("Login terlebih dahulu untuk menyimpan materi!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (resultBookmark == "berhasil") {
      toast.success("Materi berhasil disimpan!! 🤩", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsBookmarked(true);
    }
  };

  return (
    <div className="relative flex px-4 md:px-0 pt-32 pb-32 w-full flex-col items-center justify-center overflow-hidden text-white">
      <button className="relative z-10 flex items-center bg-[#2B243C] py-3 px-6 rounded-full font-space-grotes mb-8">
        <Image
          src="/icons/magic.png"
          alt="magic"
          width={40}
          height={40}
          className="mr-4"
        />
        Mau Belajar Apa Hari Ini?
      </button>
      {isLoading ? (
        <Lottie
          animationData={LoadingLottie}
          loop={true}
          width={100}
          className="relative z-10"
        />
      ) : isGenerated ? (
        <>
          <div className="text-center font-urbanis mb-6">
            <p className="text-2xl mb-3">
              Menampilkan materi untuk {formData.materi_apa}
            </p>
            <div className="border-2 border-[#FFE1B5] rounded-xl w-[120px] mx-auto"></div>
          </div>
          <div className="bg-white w-full pt-16 pb-24 font-urbanis rounded-t-[100px] relative z-10">
            {!isBookmarked && (
              <div
                onClick={handleBookmark}
                className="bg-white shadow-lg p-2 rounded-xl absolute cursor-pointer -top-6 left-28"
              >
                <BookmarkIcon />
              </div>
            )}
            <Markdown className="text-start text-[#33313B] mx-auto prose lg:prose-xl">
              {result}
            </Markdown>
            <button
              onClick={handleRegenerateMateri}
              className="absolute -bottom-8 left-0 right-0 w-max text-lg py-5 px-12 rounded-full bg-gradient-to-r from-[#99A6D5] to-[#5B75FE] mx-auto block font-bold shadow-lg shadow-[#EC27B6] shadow-button"
            >
              Belajar Lainnya
            </button>
          </div>
        </>
      ) : (
        <form
          onSubmit={handleGenerateMateri}
          className="font-urbanis relative z-10 container"
        >
          <div className="flex flex-col mb-10">
            <label htmlFor="belajar_apa" className="text-2xl font-bold mb-2">
              Belajar materi apa?
            </label>
            <input
              type="text"
              id="belajar_apa"
              name="materi_apa"
              value={formData.materi_apa}
              onChange={(e) =>
                setFormData({ ...formData, materi_apa: e.target.value })
              }
              className="bg-[#D9D9D9] rounded-2xl p-4 text-black font-medium text-lg duration-200 focus:outline-2 focus:outline-purple-600"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 mb-12">
            <div className="flex flex-col flex-1 md:mr-16">
              <label htmlFor="tingkatan" className="text-2xl font-bold mb-2">
                Kamu ada ditingkat apanihh?
              </label>
              <select
                id="tingkatan"
                name="tingkat"
                value={formData.tingkat}
                onChange={(e) =>
                  setFormData({ ...formData, tingkat: e.target.value })
                }
                className="bg-[#D9D9D9] rounded-2xl p-4 text-black font-medium text-lg duration-200 focus:outline-2 focus:outline-purple-600"
              >
                <option value="Pemula">Pemula</option>
                <option value="Menengah">Menengah</option>
                <option value="Sepuh">Sepuh</option>
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="berapa_lama" className="text-2xl font-bold mb-2">
                Kira-kira mau belajar berapa lama?
              </label>
              <select
                id="berapa_lama"
                name="durasi_belajar"
                value={formData.durasi_belajar}
                onChange={(e) =>
                  setFormData({ ...formData, durasi_belajar: e.target.value })
                }
                className="bg-[#D9D9D9] rounded-2xl p-4 text-black font-medium text-lg duration-200 focus:outline-2 focus:outline-purple-600"
              >
                <option value="Seminggu">Seminggu</option>
                <option value="Satu bulan">Satu Bulan</option>
                <option value="Lebih dari satu bulan">
                  Lebih dari satu bulan
                </option>
              </select>
            </div>
          </div>
          <div className="border mb-10"></div>
          <div className="flex flex-col mb-14">
            <label htmlFor="deskripsiin" className="text-2xl font-bold mb-2">
              Deskripsiin lagi dongg, tujuan kamu belajar ini supaya apa?
            </label>
            <textarea
              id="deskripsiin"
              name="desc_belajar"
              rows={10}
              value={formData.desc_belajar}
              onChange={(e) =>
                setFormData({ ...formData, desc_belajar: e.target.value })
              }
              className="bg-[#D9D9D9] rounded-2xl p-4 text-black font-medium text-lg duration-200 focus:outline-2 focus:outline-purple-600"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-lg py-5 px-12 rounded-full bg-gradient-to-r from-[#99A6D5] to-[#5B75FE] mx-auto block font-bold shadow-lg shadow-[#EC27B6] shadow-button"
          >
            Belajar Sekarang
          </button>
        </form>
      )}
      <Ripple />
    </div>
  );
}
