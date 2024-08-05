"use client"
import NewButton from '@/components/admin/New'
import NewCategoryForm from '@/components/form/admin/new-category'
import Heading from '@/components/frontend/Heading'
import { columns } from '@/components/table/admin/categoriesColumns'
import { DataTable } from '@/components/table/DataTable'
import { makeGetRequest } from '@/lib/apiResponse'
import React, { useCallback, useEffect, useState } from 'react'

const AdminSubjects = () => {
    const [open, setOpen] = useState<boolean>(false)

    function redirect() {
        setOpen(false)
    }

    const fetchSubjects = useCallback(async() => {
        try {
            const response = await makeGetRequest(`/categories`);
        } catch (error) {
            
        }
    }, [])

    useEffect(() => {
        fetchSubjects()
    },[fetchSubjects])

    return (
        <div className='space-y-10'>
            <Heading heading={`Subjects`} />
            {/* NEW SUBJECTS HANDLER */}
            <div className='flex justify-end w-full'>
                <NewButton heading='New Subjects' label="New Subject" open={open} setOpen={setOpen}>
                    <NewCategoryForm redirect={redirect} />
                </NewButton>
            </div>
            {/* AVAILABLE/EDIT SUBJECTS */}
            <DataTable columns={columns} url='/admin/subjects' />
        </div>
    )
}

export default AdminSubjects