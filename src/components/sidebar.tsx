import Link from "next/link"
import DashboardIcon from "../../public/icons/dashboardicon"
import SettingIcon from "../../public/icons/settingicon"
import HistoryIcon from "../../public/icons/historyicon"
import BookmarkPageIcon from "../../public/icons/bookmarkpageicon"

const Sidebar = () => {
    return (
        <aside className="flex flex-col px-4 py-6">
            <Link href="/dashboard" className="mb-8">
                <DashboardIcon />
            </Link>
            <Link href="/dashboard/setting-profile" className="mb-8">
                <SettingIcon />
            </Link>
            <Link href="/dashboard/bookmarks" className="mb-8">
                <BookmarkPageIcon />
            </Link>
            <Link href="/dashboard/histories" className="mb-2">
                <HistoryIcon />
            </Link>
        </aside>
    )
}

export default Sidebar
