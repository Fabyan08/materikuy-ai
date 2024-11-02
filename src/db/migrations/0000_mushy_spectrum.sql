CREATE TYPE "public"."durasi_belajar" AS ENUM('Seminggu', 'Satu bulan', 'Lebih dari satu bulan');--> statement-breakpoint
CREATE TYPE "public"."tingkat" AS ENUM('Pemula', 'Menengah', 'Sepuh');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "histories" (
	"id" serial PRIMARY KEY NOT NULL,
	"materi" text NOT NULL,
	"tingkat" "tingkat" DEFAULT 'Pemula',
	"durasi_belajar" "durasi_belajar" DEFAULT 'Satu bulan',
	"deskripsi" text NOT NULL,
	"response" text NOT NULL,
	"user_id" integer,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"no_hp" varchar NOT NULL,
	"password" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_no_hp_unique" UNIQUE("no_hp")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "histories" ADD CONSTRAINT "histories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
