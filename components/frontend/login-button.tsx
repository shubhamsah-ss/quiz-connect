"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import LoginForm from '../form/form-login'

interface LoginProps {
    children: React.ReactNode,
    mode?: "modal" | "redirect",
    asChild?: boolean
}

const LoginButton = ({
    children,
    asChild,
    mode = "redirect"
}: LoginProps) => {

    const router = useRouter()

    const onClick = () => {
        router.push("/login")
    } 

    if(mode == "modal") {
        return(
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent className='p-0 bg-transparent border-none'>
                    <LoginForm />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        
        <span onClick={onClick} className='cursor-pointer'>
            {children}
        </span>
    )
}

export default LoginButton