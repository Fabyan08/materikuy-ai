import {  pgEnum } from "drizzle-orm/pg-core"

export const durasiBelajar = pgEnum("durasi_belajar", ['Seminggu', 'Satu bulan', 'Lebih dari satu bulan'])
export const tingkat = pgEnum("tingkat", ['Pemula', 'Menengah', 'Sepuh'])



