import { NextAuthConfig } from "next-auth"
import { signInSchema } from "./schema/formSchemas"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { getUserByEmail, getUserById } from "./data/getUser"
import { compare } from "bcryptjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getAccountById } from "./data/account"
import { db } from "./lib/db"

export default {
    pages: {
        signIn: "/login",
        error: "/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id as string)
            if (!existingUser || !existingUser.emailVerified) return false;

            return true;
        },
        async session({ session, token }) {

            if (token.role) {
                session.user.role = token.role as "USER" | "ADMIN";
            }

            if (token.sub) {
                session.user.id = token.sub as string;
            }

            session.user.image = null

            session.user.isOAuth = token.isOAuth as boolean

            return session;
        },
        async jwt({ token }) {

            // when signing in
            if (!token.sub) return token

            // already signed in
            const existingUser = await getUserById(token.sub)

            if (!existingUser) return token;

            const existingAccount = await getAccountById(existingUser.id)

            token.isOAuth = !!existingAccount

            token.role = existingUser.role || "USER"

            token.picture = null

            return token
        },
    },

    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt"
    },
    trustHost: true,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },

            async authorize(credentials) {
                const validatedFields = signInSchema.safeParse(credentials)

                if (validatedFields.success) {

                    const { email, password } = validatedFields.data

                    const user = await getUserByEmail(email)

                    if (!user || !user.password) return null

                    const isPasswordValid = await compare(password, user.password)

                    if (isPasswordValid) return user

                }

                return null
            },
        })
    ]
} satisfies NextAuthConfig