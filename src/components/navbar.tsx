import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <nav className="fixed hidden md:block w-full px-20 z-20 py-4 backdrop-blur border-b border-b-gray-300 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <aside className="flex items-center text-sm">
            <Link href="/">
              <Image
                src="/icons/logo.png"
                alt="logo"
                width={160}
                height={60}
                className="mr-14"
              />
            </Link>
            <p className="mr-8">
              <Link href="/">Beranda</Link>
            </p>
            <p className="mr-8">
              <Link href="/generate-materi">Generate Materi</Link>
            </p>
            <p className="mr-8">
              <Link href="/pomodoro">Pomodoro</Link>
            </p>
            <p className="mr-8">
              <Link href="/rundown">Rundown</Link>
            </p>
            <p className="mr-8">
              <Link href="/rencana-belajar">Rencana Belajar</Link>
            </p>
          </aside>
          <aside>
            {session?.user ? (
              <div className="relative group">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <div className="bg-[#5C71D2] p-2 rounded-2xl">
                      <Image
                        className="h-8 w-8 rounded-full"
                        src="/icons/user_icon.png"
                        alt="user"
                        width={32}
                        height={32}
                      />
                    </div>
                  </button>
                </div>

                <div
                  className="absolute right-0 z-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-0"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={async () => {
                      await signOut({ redirect: false });
                      router.replace("/auth/signin");
                    }}
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center font-urbanis">
                <Link href="/auth/signin" className="block mr-6">
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="block py-2 px-4 rounded-full bg-[#2B243C]"
                >
                  Sign up
                </Link>
              </div>
            )}
          </aside>
        </div>
      </nav>
      <div className="flex justify-center">
        <nav className="bg-gray-700/40 border-2 border-t-white rounded-t-xl backdrop-blur-md h-20 w-full grid grid-cols-5  items-center md:hidden fixed bottom-0 z-40 px-2">
          <Link href="/" className="flex flex-col items-center gap-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-house"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>
            <p>Beranda</p>
          </Link>
          <Link href="/generate-materi" className="flex flex-col items-center gap-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-magic"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707zM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1zM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707zM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0z" />
            </svg>
            <p>Materi</p>
          </Link>
          <Link href="/pomodoro" className="flex flex-col items-center gap-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-alarm"
              viewBox="0 0 16 16"
            >
              <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" />
              <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />
            </svg>
            <p>Pomodoro</p>
          </Link>
          <Link href="/rundown" className="flex flex-col items-center gap-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-calendar-check"
              viewBox="0 0 16 16"
            >
              <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
            </svg>
            <p>Rundown</p>
          </Link>
          <Link href="/rencana-belajar" className="flex flex-col items-center gap-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-award"
              viewBox="0 0 16 16"
            >
              <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
              <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
            </svg>
            <p>Belajar</p>
          </Link>
        </nav>
        {/* <nav className="md:hidden fixed bottom-6 z-50 px-12 flex justify-center">
          <div className="bg-gray-700/40 border-2 border-white backdrop-blur-md animate-bounce  h-14 font-bold w-[18rem] px-4 rounded-full flex justify-between items-center text-white">
            <Link href="/beranda">Beranda</Link>
            <Link href="/generate-materi">Generate Materi</Link>
          </div>
        </nav> */}
      </div>
      <nav className="fixed md:hidden w-full px-10 z-50 py-4 backdrop-blur border-b border-b-gray-300 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <aside className="flex items-center text-sm">
            <Link href="/">
              <Image
                src="/icons/logo.png"
                alt="logo"
                width={120}
                height={60}
                className="mr-14"
              />
            </Link>
          </aside>
          <aside>
            {session?.user ? (
              <div className="relative group">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <div className="bg-[#5C71D2] p-2 rounded-2xl">
                      <Image
                        className="h-8 w-8 rounded-full"
                        src="/icons/user_icon.png"
                        alt="user"
                        width={32}
                        height={32}
                      />
                    </div>
                  </button>
                </div>

                <div
                  className="absolute right-0 z-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-0"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={async () => {
                      await signOut({ redirect: false });
                      router.replace("/auth/signin");
                    }}
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center whitespace-nowrap  font-urbanis">
                <Link href="/auth/signin" className="block w-full mr-6">
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="block py-2 px-4 w-full whitespace-nowrap rounded-full bg-[#2B243C]"
                >
                  Sign up
                </Link>
              </div>
            )}
          </aside>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
