"use client"
import NewButton from '@/components/admin/New'
import Heading from '@/components/frontend/Heading'
import { columns } from '@/components/table/admin/categoriesColumns'
import { DataTable } from '@/components/table/DataTable'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { toast } from 'sonner'

const NewCategoryForm = dynamic(() => import('@/components/form/admin/new-category'))

const AdminCategories = () => {
    const [open, setOpen] = useState<boolean>(false)

    function redirect() {
        toast.success("New category created! Refresh table to see changes.")
        setOpen(false)
    }

    return (
        <div className='space-y-10'>
            <Heading heading={`Categories`} />
            {/* NEW CATEGORIES HANDLER */}
            <div className='flex justify-end w-full'>
                <NewButton label="New Category" open={open} setOpen={setOpen}>
                    <NewCategoryForm redirect={redirect} />
                </NewButton>
            </div>
            
            {/* AVAILABLE/EDIT CATEGORIES */}
            <DataTable columns={columns} url='/admin/categories' />
        </div>
    )
}

export default AdminCategories