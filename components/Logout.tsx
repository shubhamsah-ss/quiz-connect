"use client"
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

const Logout = () => {
    return (

        <Button onClick={() => signOut({ callbackUrl: "/", redirect: true })} variant={"link"} size={"sm"} className='bg-destructive text-white w-full'>Logout</Button>

    )
}

export default Logout