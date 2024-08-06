"use client"
import NewButton from '@/components/admin/New'
import Heading from '@/components/frontend/Heading'
import { columns } from '@/components/table/admin/subjectColumns'
import { DataTable } from '@/components/table/DataTable'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { toast } from 'sonner'

const NewSubjectForm = dynamic(() => import('@/components/form/admin/new-subject'))

const AdminSubjects = () => {
    const [open, setOpen] = useState<boolean>(false)

    function redirect() {
        toast.success("New subject created! Refresh table to see changes.")
        setOpen(false)
    }

    return (
        <div className='space-y-10'>
            <Heading heading={`Subjects`} />
            {/* NEW SUBJECT HANDLER */}
            <div className='flex justify-end w-full'>
                <NewButton label="New Subject" open={open} setOpen={setOpen}>
                    <NewSubjectForm redirect={redirect} />
                </NewButton>
            </div>
            {/* AVAILABLE/EDIT CATEGORIES */}
            <div className='h-96 overflow-auto px-2'>
                <DataTable columns={columns} url='/admin/subjects' />
            </div>
        </div>
    )
}

export default AdminSubjects