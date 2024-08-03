import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ChangePasswordForm from '@/components/form/ChangePasswordForm'

const ChangePassword = () => {
    return (
        <Dialog>
            <DialogTrigger className='text-destructive hover:underline underline-offset-4'>Change Password</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change password</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <ChangePasswordForm />
            </DialogContent>
        </Dialog>
    )
}

export default ChangePassword