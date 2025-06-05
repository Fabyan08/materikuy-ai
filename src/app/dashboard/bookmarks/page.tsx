import Wrapper from "../wrapper";
import Link from "next/link";
import { deleteBookmark, getBookmarkByUserid } from "./action";

export default async function Bookmarks() {
    const bookmarks = await getBookmarkByUserid()
    
    return (
        <div className="py-28 md:px-20">
            <button className="relative z-10 flex mx-auto text-white font-semibold bg-[#2B243C] py-3 px-10 rounded-full font-space-grotes mb-10">
                Materi Tersimpan
            </button>
            
            <Wrapper>
                <>
                    <p className="text-xl font-bold font-urbanis mb-6">Tersimpan</p>
                    {
                        bookmarks.length == 0 ?
                        <p className="font-urbanis text-center text-xl">Kamu belum menyimpan materi</p>
                        :
                        <div className="font-urbanis grid grid-cols-2 gap-5 pb-8">
                            {
                                bookmarks.map((bookmark) => 
                                    <div key={bookmark.id} className="bg-[url('/bg-materi.png')] bg-cover pb-6 px-6 rounded-2xl h-[320px] flex justify-between items-end">
                                        <Link href={`/dashboard/bookmarks/${bookmark.id}`}>
                                            <div>
                                                <p className="font-semibold text-white">Tingkat : {bookmark.tingkat}</p>
                                                <p className="text-3xl font-bold text-white">{bookmark.materi}</p>
                                                <p className="text-lg text-gray-200">{bookmark.durasi_belajar}</p>
                                            </div>
                                        </Link>
                                        <form action={async () => {
                                            "use server"
                                            await deleteBookmark(bookmark.id)
                                        }}>
                                            <button className="bg-red-400 text-white py-2 px-4 rounded-xl font-semibold">Hapus</button>
                                        </form>
                                    </div>
                                )
                            }
                        </div>
                    }
                </>
            </Wrapper>
        </div>
    )
}
