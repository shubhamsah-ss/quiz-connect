"use client"
import { useSession } from "next-auth/react";

export default function useRole(role: "ADMIN" | "USER") {
    
    const { data: session, status } = useSession()

    if (status === "loading") {
        return "loading"
    }
    
    const currentUserRole = session?.user?.role
    
    return currentUserRole === role
}
