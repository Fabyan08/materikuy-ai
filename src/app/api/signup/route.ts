import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: { json: () => any; }) {
    const body = await req.json();
    const { name, email, no_hp, password } = body;

    if (!name || !email || !no_hp || !password) {
        return new NextResponse("Missing name, email, or password", {status: 400});
    }

    const exist = await db.select().from(users).where(or(eq(users.email, email), eq(users.no_hp, no_hp)));
    
    if (exist.length >= 1) return new NextResponse("User already exists", {status: 400});

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.insert(users).values({name: name, email, no_hp, password: hashedPassword}).returning();

    return NextResponse.json(user);
}
