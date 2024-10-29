import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Materikuy",
  description: "Buat Materi Belajarmu Sendiri. Terbaru, Praktis, Paling Efektif",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-gradient-to-r from-[#99A6D5] to-[#5B75FE]`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
