import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp()
}

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username').notNull(),
    email: varchar('email').unique().notNull(),
    no_hp: varchar('no_hp').unique().notNull(),
    password: text('password').notNull(),
    ...timestamps
});

export const tingkatEnum = pgEnum("tingkat", ["Pemula", "Menengah", "Sepuh"]);
export const durasiBelajarEnum = pgEnum("durasi_belajar", ["Seminggu", "Satu bulan", "Lebih dari satu bulan"]);
export const histories = pgTable('histories', {
    id: serial('id').primaryKey(),
    materi: text('materi').notNull(),
    tingkat: tingkatEnum().default('Pemula'),
    durasi_belajar: durasiBelajarEnum().default('Satu bulan'),
    deskripsi: text('deskripsi').notNull(),
    response: text('response').notNull(),
    userId: integer('user_id').references(() => users.id),
    ...timestamps
});

export const usersRelations = relations(users, ({many}) => ({
    histories: many(histories)
}))

export const historiesRelations = relations(histories, ({one}) => ({
    user: one(users, {
        fields: [histories.userId],
        references: [users.id]
    })
}))