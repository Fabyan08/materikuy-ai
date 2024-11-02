'use client'
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const SignoutHandler = () => {
    const router = useRouter()

    return (
        <button onClick={async () => {
            await signOut({ redirect: false })
            router.replace('/login')
        }} className="block px-4 py-2 text-sm text-gray-700">Sign out</button>
    )
}

export default SignoutHandler
