'use server'
import { GoogleGenerativeAI } from "@google/generative-ai";
  
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

export async function generateMateri(formData: FormData) {
    const rawFormData = {
      materi_apa: formData.get('materi_apa'),
      tingkat: formData.get('tingkat'),
      durasi_belajar: formData.get('durasi_belajar'),
      desc_belajar: formData.get('desc_belajar')
    }

    const chatSession = model.startChat({
        generationConfig,
        history: []
    });
    const result = await chatSession.sendMessage(`Materi : ${rawFormData.materi_apa}\nTingkat : ${rawFormData.tingkat}\nLama Belajar :  ${rawFormData.durasi_belajar}\nDeskripsi lebih lengkap : ${rawFormData.desc_belajar}`);
    
    return result.response.text();
}
