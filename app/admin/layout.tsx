"use client"
import useRole from "@/hooks/useRole"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

export default function AdminAuthLayout({ children }: Readonly<{ children: ReactNode }>) {
    const isAdmin = useRole("ADMIN")

    const router = useRouter()

    if (isAdmin == "loading") {
        // Display loading state or message while checking role
        return (
            <div className='flex justify-center items-center h-screen bg-white dark:bg-black'>
                <p className="dark:text-white">Loading...</p>
            </div>
        )
    }

    if(!isAdmin) {
        router.replace("/")
    }

    return (
        <div className='flex justify-center items-center h-screen bg-white dark:bg-black'>
            {children}
        </div>
    )
}
