import { SessionProvider } from "next-auth/react"
export default async function AuthProvider({ children }: {children: Readonly<React.ReactNode>}) {

    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}