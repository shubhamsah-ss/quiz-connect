"use client"
import NewButton from '@/components/admin/New'
import Heading from '@/components/frontend/Heading'
import { columns } from '@/components/table/admin/topicColumns'
import { DataTable } from '@/components/table/DataTable'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { toast } from 'sonner'

const NewTopicForm = dynamic(() => import('@/components/form/admin/new-topic'))

const AdminTopics = () => {
    const [open, setOpen] = useState<boolean>(false)

    function redirect() {
        toast.success("New topic created! Refresh table to see changes.")
        setOpen(false)
    }

    return (
        <div className='space-y-10'>
            <Heading heading={`Topics`} />
            {/* NEW TOPIC HANDLER */}
            <div className='flex justify-end w-full'>
                <NewButton label="New Topic" open={open} setOpen={setOpen}>
                    <NewTopicForm redirect={redirect} />
                </NewButton>
            </div>
            {/* AVAILABLE/EDIT TOPICS */}
            <div className='h-96 overflow-auto px-2'>
                <DataTable columns={columns} url='/admin/topics' />
            </div>
        </div>
    )
}

export default AdminTopics