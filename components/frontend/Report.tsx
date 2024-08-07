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
import ReportForm from '@/components/form/ReportForm'
import { Button } from '@/components/ui/button'


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
                </SheetHeader>
                <SheetDescription>
                    Will be available soon!
                </SheetDescription>
                <ReportForm />
            </SheetContent>
        </Sheet>

    )
}

export default Report