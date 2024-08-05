"use client"
import NewButton from '@/components/admin/New'
import NewCategoryForm from '@/components/form/admin/new-category'
import Heading from '@/components/frontend/Heading'
import { columns } from '@/components/table/admin/categoriesColumns'
import { DataTable } from '@/components/table/DataTable'
import { makeGetRequest } from '@/lib/apiResponse'
import React, { useCallback, useEffect, useState } from 'react'

const AdminTopics = () => {
    const [open, setOpen] = useState<boolean>(false)

    function redirect() {
        setOpen(false)
    }

    const fetchTopics = useCallback(async() => {
        try {
            const response = await makeGetRequest(`/categories`);
        } catch (error) {
            
        }
    }, [])

    useEffect(() => {
        fetchTopics()
    },[fetchTopics])

    return (
        <div className='space-y-10'>
            <Heading heading={`Topics`} />
            {/* NEW TOPIC HANDLER */}
            <div className='flex justify-end w-full'>
                <NewButton heading='New Topic' label="New Topic" open={open} setOpen={setOpen}>
                    <NewCategoryForm redirect={redirect} />
                </NewButton>
            </div>
            {/* AVAILABLE/EDIT TOPIC */}
            <DataTable columns={columns} url='/admin/topics' />
        </div>
    )
}

export default AdminTopics