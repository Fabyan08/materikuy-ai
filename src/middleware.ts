import { getToken } from "next-auth/jwt"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const isAuth = await getToken({ req: request })
    
    if (request.nextUrl.pathname.startsWith('/dashboard') && isAuth === null) {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    if ((request.nextUrl.pathname.startsWith('/auth') || request.nextUrl.pathname === '/') && isAuth !== null) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
}
