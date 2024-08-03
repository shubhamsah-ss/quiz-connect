"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from 'react'
import { IconAlertTriangleFilled } from '@tabler/icons-react'
import ReportForm from '../form/ReportForm'
import { Button } from '../ui/button'


const Report = ({ id }: { id: string }) => {
    const [open, setOpen] = useState(false)

    const onOpenChange = () => {
        setOpen(prev => !prev)
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange} >
            <SheetTrigger asChild>
                <Button variant={"link"} size={"sm"} className="flex items-center justify-center gap-1 text-xs text-destructive">
                    <IconAlertTriangleFilled className="w-4" /> Report
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full">
                <SheetHeader>
                    <SheetTitle>Report</SheetTitle>
                    <ReportForm />
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}

export default Report