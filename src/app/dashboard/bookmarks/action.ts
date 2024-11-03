import { authOptions } from "@/app/api/auth/authOptions"
import { db } from "@/db"
import { bookmarks } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export async function getBookmarkByUserid() {
    const session = await getServerSession(authOptions)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const getBookmark = await db.select().from(bookmarks).where(eq(bookmarks.userId, session?.user.id)).orderBy(desc(bookmarks.created_at))
    return getBookmark
}

export async function deleteBookmark(id: number) {
    await db.delete(bookmarks).where(eq(bookmarks.id, id))
    revalidatePath('/dashboard/bookmarks')
}

export async function getBookmark(id: number) {
    const bookmark = await db.select().from(bookmarks).where(eq(bookmarks.id, id))
    return bookmark[0]
}