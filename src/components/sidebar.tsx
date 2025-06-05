// sidebar.tsx
"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import DashboardIcon from "../../public/icons/dashboardicon";
import SettingIcon from "../../public/icons/settingicon";
import HistoryIcon from "../../public/icons/historyicon";
import BookmarkPageIcon from "../../public/icons/bookmarkpageicon";

interface SidebarProps {
  currentPath: string;
}

const Sidebar = ({  }: SidebarProps) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === path; // hanya aktif jika tepat '/dashboard'
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const linkClass = (path: string) =>
    `mb-8 p-2 rounded-lg transition-colors ${
      isActive(path)
        ? "bg-[#6366F1] text-white font-bold"
        : "text-gray-500 hover:bg-gray-100"
    }`;
  return (
    <aside className="flex flex-col px-4 py-6">
      <Link href="/dashboard" className={linkClass("/dashboard")}>
        <DashboardIcon />
      </Link>
      <Link
        href="/dashboard/setting-profile"
        className={linkClass("/dashboard/setting-profile")}
      >
        <SettingIcon />
      </Link>
      <Link
        href="/dashboard/bookmarks"
        className={linkClass("/dashboard/bookmarks")}
      >
        <BookmarkPageIcon />
      </Link>
      <Link
        href="/dashboard/histories"
        className={linkClass("/dashboard/histories")}
      >
        <HistoryIcon />
      </Link>
    </aside>
  );
};

export default Sidebar;
