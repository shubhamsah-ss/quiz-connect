import AdminAuthForm from '@/components/admin/AdminAuthForm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'

const AdminPage = () => {
    const cookiesStore = cookies()
    const tokenCookie = cookiesStore.get("adminAuth")

    const isAdminAuth = tokenCookie?.value

    if(isAdminAuth === "true") {
        redirect("/admin/dashboard")
    }

    return (
        <div className="max-w-md w-full mx-auto">
            <Suspense>
                <AdminAuthForm />
            </Suspense>
        </div>
    )
}

export default AdminPage