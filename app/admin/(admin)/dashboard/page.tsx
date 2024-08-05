"use client"

import Heading from "@/components/frontend/Heading"
import { useSession } from "next-auth/react"

const AdminDashboard = () => {
    const { data: session } = useSession()
    
    return (
        <div className="space-y-10">
            <Heading heading={`Welcome Back! ${session?.user.name}`} />
            <Heading heading={`Dashboard`} />
            
        </div>
    )
}

export default AdminDashboard