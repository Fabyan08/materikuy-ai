'use server'
import { authOptions } from "@/app/api/auth/authOptions";
import { db } from "@/db";
import { bookmarks, histories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getHistoryByUserid() {
    const session = await getServerSession(authOptions)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const getHistory = await db.select().from(histories).where(eq(histories.userId, session?.user.id)).orderBy(desc(histories.created_at))
    return getHistory
}

export async function deleteHistory(id: number) {
    await db.delete(histories).where(eq(histories.id, id))
    revalidatePath('/dashboard/histories')
}

export async function getHistory(id: number) {
    const getHistory = await db.select().from(histories).where(eq(histories.id, id))
    return getHistory[0]
}

export async function addToBookmark(id: number) {
    const history = await getHistory(id)
    await db.insert(bookmarks).values({
        materi: history.materi,
        deskripsi: history.deskripsi,
        response: history.response,
        durasi_belajar: history.durasi_belajar,
        tingkat: history.tingkat,
        userId: history.userId
    })
    redirect('/dashboard/bookmarks')
}