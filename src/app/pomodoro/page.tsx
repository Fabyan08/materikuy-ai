"use client";

import Ripple from "@/components/ripple";
import { useEffect, useState, useRef } from "react";

export default function Pomodoro() {
  const [activeTab, setActiveTab] = useState("Pomodoro");
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 menit
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const tabs = ["Pomodoro", "Short Break", "Long Break"];

  // Format MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Timer Logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // Reset timer saat tab diganti
  useEffect(() => {
    setIsRunning(false);
    if (activeTab === "Pomodoro") setTimeLeft(25 * 60);
    if (activeTab === "Short Break") setTimeLeft(5 * 60);
    if (activeTab === "Long Break") setTimeLeft(15 * 60);
  }, [activeTab]);

  const [secondsLeft, setSecondsLeft] = useState(1500); // 25 menit
  const totalTime = 1500; // total waktu (detik)
  const progressPercentage = ((totalTime - secondsLeft) / totalTime) * 100;
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      timer = setTimeout(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isRunning, secondsLeft]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex px-4 md:px-0 w-full overflow-hidden text-white">
      <div className="flex justify-center items-center h-[70vh]">
        <Ripple />
      </div>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 px-4 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <h2 className="text-xl text-gray-700 font-bold mb-4">Panduan Penggunaan</h2>
            <div className="text-gray-700 space-y-4 text-sm">
              <div>
                <strong>Navigasi Aplikasi:</strong>
                <ul className="list-disc ml-5 mt-1">
                  <li>
                    Gunakan sidebar untuk berpindah halaman seperti Dashboard,
                    Bookmark, Setting, dan History.
                  </li>
                  <li>
                    Anda dapat mengatur profil di halaman &quot;Setting Profile&quot;.
                  </li>
                </ul>
              </div>

              <div>
                <strong>Apa itu Pomodoro?</strong>
                <p>
                  Metode Pomodoro adalah teknik manajemen waktu yang membagi
                  aktivitas menjadi beberapa sesi kerja dan istirahat. Cocok
                  untuk meningkatkan fokus dan produktivitas.
                </p>
              </div>

              <div>
                <strong>Skema Waktu Pomodoro:</strong>
                <ul className="list-disc ml-5 mt-1">
                  <li>⏱️ 25 menit fokus (sesi kerja)</li>
                  <li>☕ 5 menit istirahat singkat</li>
                  <li>🔁 Ulangi 4 kali</li>
                  <li>🛌 Setelah 4 sesi, istirahat panjang 15–30 menit</li>
                </ul>
              </div>

              <div>
                <strong>Tips:</strong>
                <ul className="list-disc ml-5 mt-1">
                  <li>Jangan ganggu sesi kerja (matikan notifikasi)</li>
                  <li>
                    Gunakan waktu istirahat untuk benar-benar rehat (jalan,
                    minum, tarik napas)
                  </li>
                  <li>Catat hasil kerja setelah tiap sesi</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              aria-label="Tutup"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center w-full h-screen">
        <div className="bg-white/20 backdrop-blur-sm md:w-[60vw] w-[100vw] h-[600px] md:h-[600px] flex justify-center items-center">
          <div className="bg-white backdrop-blur-sm md:w-[55vw] w-[90vw] h-[500px] md:h-[500px]">
            <div className="flex gap-4 justify-center items-center">
              <div className="flex px-2 pt-10 items-center gap-4 justify-center">
                {tabs.map((tab) => (
                  <div
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`cursor-pointer rounded-full p-4 transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-blue-300 text-white font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-[60%] bg-gray-300 h-3 rounded mt-6 overflow-hidden">
                <div
                  className="bg-blue-400 h-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="text-blue-500 px-10 text-[100px] md:text-[150px] font-bold">
                <h1>{formatTime(timeLeft)}</h1>
              </div>

              <button
                onClick={() => setIsRunning((prev) => !prev)}
                className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded shadow hover:bg-blue-700 flex items-center gap-2 transition"
              >
                {isRunning ? (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 3.5A.5.5 0 0 1 6 4v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm5 0A.5.5 0 0 1 11 4v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                    </svg>
                    PAUSE
                  </>
                ) : (
                  <>
                    <div className="rotate-180">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.79 5.093A.5.5 0 0 1 7.5 5.5v5a.5.5 0 0 1-.79.407l-4-2.5a.5.5 0 0 1 0-.814l4-2.5z" />
                      </svg>
                    </div>
                    START
                  </>
                )}
              </button>

              {/* Optional: show which tab */}
              <p className="mt-4 text-sm text-gray-600">Mode: {activeTab}</p>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="flex justify-center absolute bottom-0 left-0 gap-2 items-center p-4 bg-blue-400 text-white rounded-tr-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-question-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
              </svg>
              <span>Panduan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
