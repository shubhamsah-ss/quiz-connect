import { ReactNode } from "react"

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className='flex justify-center items-center h-screen bg-white dark:bg-black'>
            {children}
        </div>
    )
}