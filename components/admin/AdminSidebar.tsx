"use client"
import React, { useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/Sidebar'
import { IconAppWindow, IconBooks, IconFolder, IconLayoutDashboard, IconLogout, IconMessage, IconNote, IconSettings, IconUser } from '@tabler/icons-react'
import ThemeSwitcher from '../ThemeSwitcher'
import Image from 'next/image'
import Logout from '../Logout'
import { Button } from '../ui/button'

const links = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: <IconLayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    },
    {
        label: "Categories",
        href: "/admin/categories",
        icon: <IconFolder className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    },
    {
        label: "Subjects",
        href: "/admin/subjects",
        icon: <IconBooks className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    },
    {
        label: "Topics",
        href: "/admin/topics",
        icon: <IconNote className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    },
    {
        label: "Questions",
        href: "/admin/questions",
        icon: <IconMessage className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    },
    {
        label: "Users",
        href: "/admin/users",
        icon: <IconUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    },
    {
        label: "Settings",
        href: "/admin/settings",
        icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    },
    {
        label: "Front App",
        href: "/",
        icon: <IconAppWindow className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    }
]

const AdminSidebar = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className='md:h-screen'>
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className='justify-between gap-10'>
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        <Image
                            src={"/icon.png"}
                            alt='QuizConnect'
                            width={100}
                            height={100}
                            priority
                            className='w-20 h-20 object-contain'
                        />
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>

                    <div className='mt-8 flex flex-col gap-2'>
                        <div className={`${!open ? "flex items-center" : ""} w-full`}>
                            <ThemeSwitcher />
                        </div>
                        {
                            !open ? <MiniLogout /> : <Logout />
                        }
                    </div>

                </SidebarBody>
            </Sidebar>
        </div>
    )
}

const MiniLogout = () => {
    return (
        <Button variant={"link"} size={"icon"} className='bg-destructive text-white w-full'>
            <IconLogout />
        </Button>
    )
}

export default AdminSidebar