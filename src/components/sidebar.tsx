import Link from "next/link"
import DashboardIcon from "../../public/icons/dashboardicon"
import SettingIcon from "../../public/icons/settingicon"

const Sidebar = () => {
    return (
        <aside className="flex flex-col px-4 py-6">
            <Link href="/dashboard" className="mb-8">
                <DashboardIcon />
            </Link>
            <Link href="/dashboard/setting-profile" className="mb-2">
                <SettingIcon />
            </Link>
        </aside>
    )
}

export default Sidebar
