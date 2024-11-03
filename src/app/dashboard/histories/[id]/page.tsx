import Markdown from "react-markdown"
import Link from "next/link"
import { addToBookmark, getHistory } from "../actions"
import BookmarkIcon from "../../../../../public/icons/bookmarkicon"

export default async function HistoryId({params}: {params: Promise<{ id: string }>}) {
    const id = (await params).id
    const history = await getHistory(Number(id))
    
    return (
        <div className="py-28">
            <div className="text-center font-urbanis mb-6 text-white">
                <p className="text-2xl mb-3">Riwayat untuk materi {history.materi}</p>
                <div className="border-2 border-[#FFE1B5] rounded-xl w-[120px] mx-auto"></div>
            </div>
            <div className="bg-white w-full pt-16 pb-24 font-urbanis rounded-t-[100px] relative z-10">
                <form action={async () => {
                    "use server"
                    await addToBookmark(Number(id))
                }}>
                    <button type="submit" className="bg-white shadow-lg p-2 rounded-xl absolute cursor-pointer -top-6 left-28">
                        <BookmarkIcon />
                    </button>
                </form>
                <Markdown className="text-start text-[#33313B] mx-auto prose lg:prose-xl">{history.response}</Markdown>
                <Link href="/generate-materi" className="absolute text-white -bottom-8 left-0 right-0 w-max text-lg py-5 px-12 rounded-full bg-gradient-to-r from-[#99A6D5] to-[#5B75FE] mx-auto block font-bold shadow-lg shadow-[#EC27B6] shadow-button">Belajar Lainnya</Link>
            </div>
        </div>
    )
}