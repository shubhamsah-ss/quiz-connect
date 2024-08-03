"use client"
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import LoginForm from '@/components/form/form-login'

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

    const [open, setOpen] = useState(false)

    if(mode == "modal") {
        return(
            <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
                <DialogTrigger onClick={() => setOpen(open)} asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent className='p-0 bg-transparent border-none'>
                    <LoginForm setOpen={setOpen} />
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