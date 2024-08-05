"use client"
import NewButton from '@/components/admin/New'
import Heading from '@/components/frontend/Heading'
import { columns } from '@/components/table/admin/categoriesColumns'
import { DataTable } from '@/components/table/DataTable'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const NewCategoryForm = dynamic(() => import('@/components/form/admin/new-category'))

const AdminCategories = () => {
    const [open, setOpen] = useState<boolean>(false)

    function redirect() {
        setOpen(false)
        window.location.reload()
    }

    return (
        <div className='space-y-10'>
            <Heading heading={`Categories`} />
            {/* NEW CATEGORIES HANDLER */}
            <div className='flex justify-end w-full'>
                <NewButton heading='New Category' label="New Category" open={open} setOpen={setOpen}>
                    <NewCategoryForm redirect={redirect} />
                </NewButton>
            </div>
            {/* AVAILABLE/EDIT CATEGORIES */}
            <DataTable columns={columns} url='/admin/categories' />
        </div>
    )
}

export default AdminCategories