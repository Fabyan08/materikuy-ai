import Wrapper from "../wrapper";
import Link from "next/link";
import { deleteHistory, getHistoryByUserid } from "./actions";

export default async function Histories() {
    const histories = await getHistoryByUserid()
    
    return (
        <div className="py-28">
            <button className="relative z-10 flex mx-auto text-white font-semibold bg-[#2B243C] py-3 px-10 rounded-full font-space-grotes mb-10">
                History Materi
            </button>
            
            <Wrapper>
                <>
                    <p className="text-xl font-bold font-urbanis mb-6">Riwayat</p>
                    {
                        histories.length == 0 ?
                        <p className="font-urbanis text-center text-xl">Kamu belum memiliki riwayat materi</p>
                        :
                        <div className="font-urbanis grid grid-cols-2 gap-5 pb-8">
                            {
                                histories.map((history) => 
                                    <div key={history.id} className="bg-[url('/bg-materi.png')] bg-cover pb-6 px-6 rounded-2xl h-[320px] flex justify-between items-end">
                                        <Link href={`/dashboard/histories/${history.id}`}>
                                            <div>
                                                <p className="font-semibold text-white">Tingkat : {history.tingkat}</p>
                                                <p className="text-3xl font-bold text-white">{history.materi}</p>
                                                <p className="text-lg text-gray-200">{history.durasi_belajar}</p>
                                            </div>
                                        </Link>
                                        <form action={async () => {
                                            "use server"
                                            await deleteHistory(history.id)
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
