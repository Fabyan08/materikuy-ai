import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, primaryKey, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp()
}

export const users = pgTable('user', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    no_hp: varchar('no_hp').unique().notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
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
    userId: text('user_id').references(() => users.id),
    ...timestamps
});

export const historiesRelations = relations(histories, ({one}) => ({
    user: one(users, {
        fields: [histories.userId],
        references: [users.id]
    })
}))

export const bookmarks = pgTable('bookmarks', {
    id: serial('id').primaryKey(),
    materi: text('materi').notNull(),
    tingkat: tingkatEnum().default('Pemula'),
    durasi_belajar: durasiBelajarEnum().default('Satu bulan'),
    deskripsi: text('deskripsi').notNull(),
    response: text('response').notNull(),
    userId: text('user_id').references(() => users.id),
    ...timestamps
});

export const bookmarksRelations = relations(bookmarks, ({one}) => ({
    user: one(users, {
        fields: [bookmarks.userId],
        references: [users.id]
    })
}))

export const usersRelations = relations(users, ({many}) => ({
    histories: many(histories),
    bookmarks: many(bookmarks)
}))

export const accounts = pgTable("account",
    {
        userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
        }),
    })
)

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable("verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
        }),
    })
)

export const authenticators = pgTable("authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: text("transports"),
    },
    (authenticator) => ({
        compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
        }),
    })
)