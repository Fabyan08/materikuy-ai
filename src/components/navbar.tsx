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
            <p>
              <Link href="/generate-materi">Generate Materi</Link>
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
        <nav className="md:hidden fixed bottom-6 z-50 px-12 flex justify-center">
          <div className="bg-gray-700/40 border-2 border-white backdrop-blur-md animate-bounce  h-14 font-bold w-[18rem] px-4 rounded-full flex justify-between items-center text-white">
            <Link href="/beranda">Beranda</Link>
            <Link href="/generate-materi">Generate Materi</Link>
          </div>
        </nav>
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
