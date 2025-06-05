import Image from "next/image";

const SecondSection = () => {
  return (
    <div className="bg-[#081225] rounded-t-[60px] font-urbanis mb-20">
      <div className="bg-[#859DBD] bg-opacity-40 py-6 text-center text-gray-300 md:text-lg font-bold rounded-t-[60px]">
        “Belajar apapun, dimanapun, materi apapun!“
      </div>
      <div className="pt-14 px-4 md:px-0">
        <p className="text-center text-2xl font-bold mb-4">
          Buat materi pembelajaran sesuka kamu...
        </p>
        <div className="border-2 border-[#FFE1B5] rounded-xl w-[120px] mx-auto mb-24"></div>
        <div className="flex flex-col md:flex-row gap-10 justify-between">
          <aside className="md:w-[500px] md:ml-48">
            <p className="font-bold text-xl md:text-5xl mb-4">
              Belajar Lebih Mudah Pakai Materikuy
            </p>
            <p className="md:text-lg md:leading-snug">
              Materikuy membantumu belajar lebih cepat dan terarah sesuai
              kebutuhanmu. Cukup isi topik, tingkat, dan durasi belajar, lalu
              sistem kami akan menghasilkan materi belajar yang disesuaikan.
              Cocok untuk pelajar, mahasiswa, hingga profesional yang ingin
              upgrade skill dengan cara yang seru dan efisien.
            </p>
          </aside>
          <aside>
            <Image
              src="/perpus.png"
              alt="perpus"
              className="rounded-t-[50px] md:pr-20 h-[500px] object-fill"
              width={900}
              height={300}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
