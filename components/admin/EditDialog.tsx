import { ReactNode } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

type EditDialogProps = {
    children: ReactNode,
    title: string,
}

const EditDialog = ({
    children,
    title
}: EditDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger className="hover:underline underline-offset-4" asChild>
                <Button variant={"outline"} size={"sm"}>Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription></DialogDescription>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default EditDialog