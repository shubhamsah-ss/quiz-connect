
import { Button } from '@/components/ui/button'
import { preLogout } from '@/lib/preFunctions'
import { signOut } from 'next-auth/react'
import { cookies } from 'next/headers'

const Logout = () => {

    const handleClick = async() => {

        await preLogout()

        signOut({ callbackUrl: "/", redirect: true })
    }
    return (

        <Button onClick={handleClick} variant={"link"} size={"sm"} className='bg-destructive text-white w-full'>Logout</Button>

    )
}

export default Logout