'use server'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";
import { db } from "@/db";
import { bookmarks, histories } from "@/db/schema";
  
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "aku akan membuat sebuah aplikasi untuk menggenerate materi secara otomatis. Prompt selanjutnya adalah konteks dari materinya. Responsenya langsung materinya saja. Berikan materi secara lengkap",
});

const generationConfig = {
    temperature: 1.5,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};  

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMateri(formData: any) {
    const session = await getServerSession(authOptions)

    const chatSession = model.startChat({
        generationConfig,
        history: []
    });
    const result = await chatSession.sendMessage(`Materi : ${formData.materi_apa}\nTingkat : ${formData.tingkat}\nLama Belajar :  ${formData.durasi_belajar}\nDeskripsi lebih lengkap : ${formData.desc_belajar}`);
    
    if (session?.user) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        const userId = session?.user?.id

        await db.insert(histories).values({
            materi: formData.materi_apa,
            tingkat: formData.tingkat,
            durasi_belajar: formData.durasi_belajar,
            deskripsi: formData.desc_belajar,
            response: result.response.text(),
            userId
        })
    }

    return result.response.text();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function bookmarkMateri(formData: any, result: any) {
    const session = await getServerSession(authOptions)

    if(session?.user) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        const userId = session?.user?.id

        await db.insert(bookmarks).values({
            materi: formData.materi_apa,
            tingkat: formData.tingkat,
            durasi_belajar: formData.durasi_belajar,
            deskripsi: formData.desc_belajar,
            response: result,
            userId
        })

        return 'berhasil'
    } else {
        return 'gak login'
    }
}