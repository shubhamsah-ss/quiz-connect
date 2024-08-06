"use client"
import { UserType } from '@/types/user'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ProfileForm = dynamic(() => import('@/components/form/ProfileForm'))
const ChangePassword = dynamic(() => import('@/components/frontend/ChangePassword'))
const Profile = ({ user }: { user: UserType | null}) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(user){
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }
    }, [user])

    if(loading) {
        return <p>Loading User details...</p>
    }

    return (
        <div className="w-full max-w-7xl mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-black space-y-10">
            <ProfileForm user={user} />
            {!user?.isOAuth && <ChangePassword />}
        </div>
    )
}

export default Profile