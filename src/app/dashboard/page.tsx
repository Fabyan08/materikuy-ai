import Wrapper from "./wrapper";
import Image from "next/image";
import Link from "next/link";
import { getUser } from "./setting-profile/actions";

export default async function Dashboard() {
    const userData = await getUser()
    
    return (
        <div className="py-28">
            <button className="relative z-10 flex mx-auto text-white font-semibold bg-[#2B243C] py-3 px-10 rounded-full font-space-grotes mb-10">
                Profile
            </button>
            
            <Wrapper>
                <>
                    <div className="flex mb-10">
                        <Image src="/icons/user_icon.png" className="bg-purple-400 p-3 rounded-3xl" alt="profile" width={60} height={60} />
                        <div className="ml-6">
                            <p className="text-lg font-medium">{userData.name}</p>
                            <p className="text-gray-500">{userData.email}</p>
                        </div>
                    </div>
                    <Link href="/dashboard/setting-profile" className="bg-[#4182F9] text-white w-full block text-center py-4 font-semibold rounded-2xl">Edit Profile</Link>
                </>
            </Wrapper>
        </div>
    )
}
