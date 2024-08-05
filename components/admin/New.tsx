import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

type NewButtonProps = {
    label: string,
    open: boolean
    setOpen: Dispatch<SetStateAction<any>>
    children: ReactNode,
    heading: string,
}

const NewButton = ({
    label,
    open,
    setOpen,
    children,
    heading,
}: NewButtonProps) => {
    return (
        <Dialog open={open} onOpenChange={() => setOpen((prev: boolean) => !prev)}>
            <DialogTrigger asChild>
                <button className="hover:animate-none animate-shimmer h-12 rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    {label}
                </button>
            </DialogTrigger>
            <DialogContent className='bg-white dark:bg-black border-none'>
                <DialogTitle>
                    <DialogHeader>
                        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                            {heading}
                        </h2>
                    </DialogHeader>
                    <DialogDescription>
                        Add {heading}
                    </DialogDescription>
                </DialogTitle>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default NewButton