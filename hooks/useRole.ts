"use client"
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function useRole(role: "ADMIN" | "USER") {
    const [refreshTime, setRefreshTime] = useState<number>(3)
    
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            if(refreshTime === 0) {
                window.location.replace("/login")
            }
            setRefreshTime(prev => prev - 1)
            window.location.reload()
        },
    })

    if (status === "loading") {
        return "loading"
    }
    
    const currentUserRole = session?.user?.role
    
    return currentUserRole === role
}
