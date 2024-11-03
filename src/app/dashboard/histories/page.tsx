import Wrapper from "../wrapper";
import Image from "next/image";
import Link from "next/link";

export default async function Histories() {
    return (
        <div className="py-28">
            <button className="relative z-10 flex mx-auto text-white font-semibold bg-[#2B243C] py-3 px-10 rounded-full font-space-grotes mb-10">
                History Materi
            </button>
            
            <Wrapper>
                <>
                    <p>INI HISTORI</p>
                </>
            </Wrapper>
        </div>
    )
}
