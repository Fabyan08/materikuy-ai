"use client";

import { useState, useEffect, useRef } from "react";
import Ripple from "@/components/ripple";

export default function RencanaBelajar() {
  const [totalMateri, setTotalMateri] = useState<number>(5);
  const [targetHari, setTargetHari] = useState<number>(2);
  const [durasiMenit, setDurasiMenit] = useState<number>(25);

  const [materiHarian, setMateriHarian] = useState<string[][]>([]);
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [statusMateri, setStatusMateri] = useState<boolean[]>([]);

  const [timer, setTimer] = useState<number>(durasiMenit * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const bagiMateriPerHari = () => {
    const allMateri: string[] = [];
    for (let i = 1; i <= totalMateri; i++) {
      allMateri.push(`Materi ${i}`);
    }

    const materiPerHari = Math.ceil(totalMateri / targetHari);
    const hariList: string[][] = [];

    for (let i = 0; i < totalMateri; i += materiPerHari) {
      hariList.push(allMateri.slice(i, i + materiPerHari));
    }

    return hariList;
  };

  const handleHitung = () => {
    if (totalMateri <= 0 || targetHari <= 0) {
      alert("Jumlah materi dan hari harus lebih dari 0");
      return;
    }

    const listHarian = bagiMateriPerHari();
    setMateriHarian(listHarian);
    setCurrentDay(0);
    setStatusMateri(new Array(listHarian[0]?.length || 0).fill(false));
    setTimer(durasiMenit * 60);
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleNextDay = () => {
    if (currentDay < materiHarian.length - 1) {
      const nextDay = currentDay + 1;
      setCurrentDay(nextDay);
      setStatusMateri(new Array(materiHarian[nextDay].length).fill(false));
      setTimer(durasiMenit * 60);
      setIsRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  const handleSelesaiMateri = (index: number) => {
    const updated = [...statusMateri];
    updated[index] = true;
    setStatusMateri(updated);
    setTimer(durasiMenit * 60);
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((t) => {
          if (t === 0) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const materiHariIni = materiHarian[currentDay] || [];
  const materiSelesaiCount = statusMateri.filter(Boolean).length;
  const progressPercent =
    materiHariIni.length > 0
      ? (materiSelesaiCount / materiHariIni.length) * 100
      : 0;

  useEffect(() => {
    const dataToStore = {
      materiHarian,
      currentDay,
      statusMateri,
      durasiMenit,
      timer,
    };
    localStorage.setItem("rencanaBelajar", JSON.stringify(dataToStore));
  }, [materiHarian, currentDay, statusMateri, durasiMenit, timer]);

  useEffect(() => {
    const stored = localStorage.getItem("rencanaBelajar");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMateriHarian(parsed.materiHarian || []);
        setCurrentDay(parsed.currentDay || 0);
        setStatusMateri(parsed.statusMateri || []);
        setDurasiMenit(parsed.durasiMenit || 25);
        setTimer(parsed.timer || (parsed.durasiMenit || 25) * 60);
      } catch (err) {
        console.error("Gagal memuat data dari localStorage", err);
      }
    }
  }, []);

  return (
    <div className="relative flex px-4 md:px-0 w-full overflow-x-hidden text-black min-h-screen bgblue-300">
      <div className="flex justify-center items-center h-[70vh]">
        <Ripple />
      </div>

      <div className="flex items-center justify-center w-full h-screen">
        <div className="bg-white/90 relative md:mt-60  backdrop-blur-sm md:w-[10000px] w-[100vw]  max-w-3xl h-fit flex flex-col justify-center items-center p-6 rounded-lg shadow-lg">
          <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
              Kalkulator Rencana Belajar Interaktif
            </h1>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="totalMateri">Total materi</label>
                <input
                  type="number"
                  min={1}
                  value={totalMateri}
                  onChange={(e) =>
                    setTotalMateri(parseInt(e.target.value) || 0)
                  }
                  placeholder="Jumlah Materi"
                  className="border rounded px-4 py-2"
                />
              </div>
              <div>
                <label htmlFor="targetHari">Target Hari</label>
                <input
                  type="number"
                  min={1}
                  value={targetHari}
                  onChange={(e) => setTargetHari(parseInt(e.target.value) || 0)}
                  placeholder="Target Hari"
                  className="border rounded px-4 py-2"
                />
              </div>
              <div>
                <label htmlFor="durasi">Durasi belajar permateri (menit)</label>
                <input
                  type="number"
                  min={5}
                  value={durasiMenit}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 25;
                    setDurasiMenit(val);
                    setTimer(val * 60);
                  }}
                  placeholder="Durasi per materi (menit)"
                  className="border rounded px-4 py-2"
                />
              </div>
            </div>

            <button
              onClick={handleHitung}
              className="bg-blue-700 text-white px-6 py-2 rounded shadow"
            >
              Hitung & Mulai
            </button>

            {materiHariIni.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-bold text-blue-700 mb-2">
                  Hari ke-{currentDay + 1} dari {materiHarian.length}
                </h2>

                <div className="w-full bg-gray-300 rounded-full h-6 mb-3">
                  <div
                    className="bg-blue-600 h-6 rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="mb-4 text-sm text-gray-700">
                  Materi selesai: {materiSelesaiCount} / {materiHariIni.length}
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {materiHariIni.map((materi, i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-center px-4 py-2 rounded shadow ${
                        statusMateri[i]
                          ? "bg-green-100 text-green-800 line-through"
                          : "bg-white"
                      }`}
                    >
                      <span>{materi}</span>
                      {!statusMateri[i] ? (
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                          onClick={() => handleSelesaiMateri(i)}
                        >
                          Selesai
                        </button>
                      ) : (
                        <span>✔</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col items-center">
                  <div className="text-4xl font-mono mb-2 text-blue-800">
                    {formatTime(timer)}
                  </div>
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`px-6 py-2 rounded text-white font-semibold ${
                      isRunning ? "bg-red-600" : "bg-green-600"
                    }`}
                  >
                    {isRunning ? "Pause" : "Start"}
                  </button>
                </div>

                {/* Tombol hari berikutnya */}
                {currentDay < materiHarian.length - 1 && (
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={handleNextDay}
                      className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                    >
                      Hari Berikutnya
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
