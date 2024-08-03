import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import { getUserById } from "./data/getUser";
import { db } from "./lib/db";

declare module "next-auth" {

    interface Session {
        user: {
            id: string;
            role: "ADMIN" | "USER";
        } & DefaultSession["user"];
    }

    interface User {
        role: "ADMIN" | "USER",
    }

}

export const {
    auth,
    handlers,
    signIn,
    signOut,
} = NextAuth({
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

            return session;
        },
        async jwt({ token }) {

            // when signing in
            if (!token.sub) return token

            // already signed in
            const existingUser = await getUserById(token.sub)

            if (!existingUser) return token;
            token.role = existingUser.role

            token.picture = null

            return token
        },
    },

    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt"
    },
    trustHost: true,
    ...authConfig
});
