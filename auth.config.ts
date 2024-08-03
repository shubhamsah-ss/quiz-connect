import { NextAuthConfig } from "next-auth"
import { signInSchema } from "./schema/formSchemas"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { getUserByEmail } from "./data/getUser"
import { compare } from "bcryptjs"
export default {
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