"use server";
import { GoogleGenAI } from "@google/genai";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";
import { db } from "@/db";
import { bookmarks, histories } from "@/db/schema";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMateri(formData: any) {
  const session = await getServerSession(authOptions);

  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Materi : ${formData.materi_apa}\nTingkat : ${formData.tingkat}\nLama Belajar : ${formData.durasi_belajar}\nDeskripsi lebih lengkap : ${formData.desc_belajar}`,
          },
        ],
      },
    ],
  });

  const text = result.text;

  if (session?.user) {
    // @ts-expect-error: third-party library type mismatch
    const userId = session.user.id;

    // @ts-expect-error: third-party library type mismatch
    await db.insert(histories).values({
      materi: formData.materi_apa,
      tingkat: formData.tingkat,
      durasi_belajar: formData.durasi_belajar,
      deskripsi: formData.desc_belajar,
      response: text,
      userId,
    });
  }

  return text;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function bookmarkMateri(formData: any, result: any) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    // @ts-expect-error: third-party library type mismatch
    const userId = session.user.id;

    await db.insert(bookmarks).values({
      materi: formData.materi_apa,
      tingkat: formData.tingkat,
      durasi_belajar: formData.durasi_belajar,
      deskripsi: formData.desc_belajar,
      response: result,
      userId,
    });

    return "berhasil";
  } else {
    return "gak login";
  }
}
