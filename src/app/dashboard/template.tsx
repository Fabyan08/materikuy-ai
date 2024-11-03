import Sidebar from "@/components/sidebar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Template({children}: any) {
    return (
        <main className="py-32">
            <Sidebar />
            {children}
        </main>
    )
}
