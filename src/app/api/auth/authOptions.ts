import { AuthOptions, SessionStrategy } from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
    adapter: DrizzleAdapter(db),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
              email: { label: "Email", type: "email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
              if (!credentials?.email || !credentials.password) {
                return null
              }
      
              const user = await db.select().from(users).where(eq(users.email, credentials.email))
      
              if (user.length == 0) return null
      
              const passwordMatch = await bcrypt.compare(credentials.password, user[0].password)
      
              if (!passwordMatch) return null
      
              return user[0]
            }
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        newUser: "/auth/signup"
    },
    session: {
        strategy: "jwt" as SessionStrategy
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: ({ session, token }) => ({
          ...session,
          user: {
            ...session.user,
            id: token.sub,
          },
        }),
    }
}