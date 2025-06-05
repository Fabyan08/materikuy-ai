import Wrapper from "../wrapper";
import Image from "next/image";
import { getUser, updateProfile } from "./actions";

export default async function SettingProfile() {
  const getUserResult = await getUser();

  return (
    <div className="py-28 md:px-20">
      <button className="relative z-10 flex mx-auto text-white font-semibold bg-[#2B243C] py-3 px-10 rounded-full font-space-grotes mb-10">
        Profile
      </button>
      <Wrapper>
        <>
          <div className="flex mb-10">
            <Image
              src="/icons/user_icon.png"
              className="bg-purple-400 p-3 rounded-3xl"
              alt="profile"
              width={60}
              height={60}
            />
            <div className="ml-6">
              <p className="text-lg font-medium">{getUserResult.name}</p>
              <p className="text-gray-500">{getUserResult.email}</p>
            </div>
          </div>
          <form className="mb-8" action={updateProfile}>
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col mb-5 flex-1 mr-4">
                <label htmlFor="name" className="font-medium mb-2 text-black">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={getUserResult.name || ""}
                  id="name"
                  name="name"
                  className="rounded-2xl border border-[#4285F4] px-4 py-3 text-black font-medium duration-200 focus:outline-2 focus:outline-purple-600"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="flex flex-col mb-5 flex-1">
                <label htmlFor="email" className="font-medium mb-2 text-black">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={getUserResult.email || ""}
                  id="email"
                  name="email"
                  className="bg-gray-300 rounded-2xl border border-[#4285F4] px-4 py-3 text-black font-medium duration-200 focus:outline-2 focus:outline-purple-600"
                  placeholder="Email"
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-col mb-5 flex-1 mr-4">
              <label htmlFor="no_hp" className="font-medium mb-2 text-black">
                No HP
              </label>
              <input
                type="text"
                defaultValue={getUserResult.no_hp}
                id="no_hp"
                name="no_hp"
                className="rounded-2xl border border-[#4285F4] px-4 py-3 text-black font-medium duration-200 focus:outline-2 focus:outline-purple-600"
                placeholder="No hp"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#4182F9] text-white w-full block text-center py-4 font-semibold rounded-2xl"
            >
              Edit Profile
            </button>
          </form>
          <form>
            <p className="font-bold text-gray-400 mb-3">Perbarui Password</p>
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col  mb-5 flex-1 mr-4">
                <label htmlFor="new_pw" className="font-medium mb-2 text-black">
                  Password baru
                </label>
                <input
                  type="password"
                  id="new_pw"
                  name="new_pw"
                  className="rounded-2xl border border-[#4285F4] px-4 py-3 text-black font-medium duration-200 focus:outline-2 focus:outline-purple-600"
                  placeholder="Masukkan password baru"
                  required
                />
              </div>
              <div className="flex flex-col mb-5 flex-1">
                <label
                  htmlFor="confirm_pw"
                  className="font-medium mb-2 text-black"
                >
                  Konfirmasi password
                </label>
                <input
                  type="password"
                  id="confirm_pw"
                  name="confirm_pw"
                  className="rounded-2xl border border-[#4285F4] px-4 py-3 text-black font-medium duration-200 focus:outline-2 focus:outline-purple-600"
                  placeholder="Konfirmasi password baru"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#4182F9] text-white w-full block text-center py-4 font-semibold rounded-2xl"
            >
              Perbarui password
            </button>
          </form>
        </>
      </Wrapper>
    </div>
  );
}
