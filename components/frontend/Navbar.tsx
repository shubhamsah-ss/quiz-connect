"use client"
import Logout from '@/components/Logout';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Button } from '@/components/ui/button';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoginButton from '@/components/frontend/login-button';
import { useSession } from 'next-auth/react';

const Navbar = () => {

    const { status } = useSession()

    const [isAuthenticated, setAuthentication] = useState(false)

    useEffect(() => {
        if (status === "authenticated") setAuthentication(true)
        if (status === "unauthenticated") setAuthentication(false)
    }, [status])

    // const isAuthenticated = false
    // let links = [
    //     { name: "Questions", link: "/questions", className: "", buttonClass: "" },
    //     { name: "Logout", link: "/logout", className: "", buttonClass: "" },
    //     { name: "Login", link: "/login", className: "", buttonClass: "" },
    //     { name: "Register", link: "/register", className: "", buttonClass: "bg-destructive text-white w-full" }
    // ]

    const [open, setOpen] = useState<boolean>(false)
    return (
        <header className='z-50 w-full bg-white dark:bg-black fixed top-0 left-0 shadow-md drop-shadow-md md:py-2 md:static dark:border-b dark:shadow-neutral-900'>
            <nav className='md:flex items-center justify-between md:mx-4'>
                <div className='flex items-center justify-between p-2 md:p-0'>
                    <Link href={"/"} className='flex items-center space-x-2 text-3xl font-bold whitespace-nowrap text-black dark:text-white drop-shadow-md'>
                        <div className='flex items-center'>
                            <Image priority={true} src="/q.png" alt='Quiz Connect' width={100} height={100} className='h-8 w-8' />
                            <span>
                                uiz
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <Image priority={true} src="/c.png" alt='Quiz Connect' width={100} height={100} className='h-8 w-8' />
                            <span>
                                onnect
                            </span>
                        </div>
                    </Link>

                    <Button variant={"ghost"} size={"icon"} onClick={() => setOpen(prev => !prev)} className='md:hidden cursor-pointer'>
                        {
                            open ? <X size={30} /> : <Menu size={30} />
                        }
                    </Button>

                </div>
                <ul className={`absolute top-14 px-5 transition-all bg-white dark:bg-black md:bg-transparent h-screen duration-500 ${open ? "right-0 opacity-100 w-[100vw]" : "right-[-300px] opacity-0 md:opacity-100"}
                md:w-auto md:pl-0 md:static md:px-3 md:space-x-1 md:flex md:items-center md:h-full`}>
                    <li className=''>
                        <ThemeSwitcher />
                    </li>
                    <li className='hover:text-gray-400 text-xl duration-500 my-7 md:my-0'>
                        <Link onClick={() => setOpen(false)} href={"/questions"} className='text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50 h-9 px-3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium'>Questions</Link>
                    </li>
                    {
                        isAuthenticated ? (
                            <>
                                <li>
                                    <Button variant={"link"} asChild>
                                        <Link href={"/dashboard"}>Dashboard</Link>
                                    </Button>
                                </li>
                                <li>
                                    <Logout />
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <LoginButton mode='modal' asChild>
                                        <Button variant={"link"}>Login</Button>
                                    </LoginButton>
                                </li>

                                <li>
                                    <Button variant={"destructive"} asChild>
                                        <Link href={"/register"}>Register</Link>
                                    </Button>
                                </li>
                            </>
                        )
                    }

                    {/* {
                        links.map((nav, i) => (
                            <li key={nav.name} className={cn("hover:text-gray-400 text-xl duration-500 my-7 md:my-0", nav.className)}>
                                <Button variant={"link"} size={"sm"} className={nav.buttonClass}>
                                    <Link href={nav.link} className='text-base'>{nav.name}</Link>
                                </Button>
                            </li>
                        ))
                    } */}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar