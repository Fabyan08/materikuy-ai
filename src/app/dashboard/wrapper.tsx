"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Wrapper({ children }: any) {
  const pathname = usePathname();

  return (
    <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-3xl p-4 container mx-auto">
      <div className="bg-white rounded-3xl flex h-[900px] overflow-auto">
        <Sidebar currentPath={pathname} />
        <div className="px-10 py-10 w-full">{children}</div>
      </div>
    </div>
  );
}
