import Markdown from "react-markdown"
import Link from "next/link"
import { getBookmark } from "../action"

export default async function BookmarkId({params}: {params: Promise<{ id: string }>}) {
    const id = (await params).id
    const bookmark = await getBookmark(Number(id))
    
    return (
        <div className="py-28">
            <div className="text-center font-urbanis mb-6 text-white">
                <p className="text-2xl mb-3">Materi tersimpan untuk {bookmark.materi}</p>
                <div className="border-2 border-[#FFE1B5] rounded-xl w-[120px] mx-auto"></div>
            </div>
            <div className="bg-white w-full pt-16 pb-24 font-urbanis rounded-t-[100px] relative z-10">
                <Markdown className="text-start text-[#33313B] mx-auto prose lg:prose-xl">{bookmark.response}</Markdown>
                <Link href="/generate-materi" className="absolute text-white -bottom-8 left-0 right-0 w-max text-lg py-5 px-12 rounded-full bg-gradient-to-r from-[#99A6D5] to-[#5B75FE] mx-auto block font-bold shadow-lg shadow-[#EC27B6] shadow-button">Belajar Lainnya</Link>
            </div>
        </div>
    )
}