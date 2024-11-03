"use server"

import { authOptions } from "@/app/api/auth/authOptions";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'

export const updateProfile = async (formData: FormData) => {
    const session = await getServerSession(authOptions)

    const rawFormData = {
        name: formData.get('name'),
        no_hp: formData.get('no_hp')
    }
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    await db.update(users).set(rawFormData).where(eq(users.id, session?.user.id))
    redirect('/dashboard')
}


export const getUser = async () => {
    const session = await getServerSession(authOptions)
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const userResult = await db.select().from(users).where(eq(users.id, session?.user.id))
    
    return userResult[0]
}