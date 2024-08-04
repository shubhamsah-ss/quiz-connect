import authConfig from "@/auth.config";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {

    interface Session {
        user: {
            id: string;
            role: "ADMIN" | "USER";
            isOAuth: boolean,
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
    unstable_update
} = NextAuth(authConfig);
