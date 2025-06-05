import Image from "next/image";

const JoinNow = () => {
  return (
    <div className="px-20">
      <div className=" mx-auto rounded-3xl bg-[#2B243C] py-14 font-urbanis">
        <Image
          src="/icons/logo.png"
          alt="logo"
          width={150}
          height={200}
          className="mx-auto mb-6"
        />
        <p className="font-extrabold text-4xl text-center mb-3">
          Gabung Sekarang!
        </p>
        <p className="text-xl text-center mb-10">
          Buat Materi Pembelalajaranmu Sendiri Sekarang...
        </p>
        <p className="font-urbanis font-bold w-max mx-auto bg-gradient-to-r from-[#99A6D5] to-[#5B75FE] py-3 px-9 rounded-full">
          Belajar Sekarang
        </p>
      </div>
    </div>
  );
};

export default JoinNow;
