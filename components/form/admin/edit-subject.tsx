"use client"
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { makeDeleteRequest, makeGetRequest, makePatchRequest } from '@/lib/apiResponse'
import { SelectItemsType } from '@/types/form'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { FormInput, FormMultiSelect } from '../form-inputs'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'

type EditSubjectProps = {
    id: string,
    name: string,
    defaultInputs?: {
        id: string,
        name: string
    }[]
}

type Values = {
    categoriesId: string[],
    subject: string
}

const EditSubject = ({
    id,
    name,
    defaultInputs
}: EditSubjectProps) => {

    const [isLoading, startLoading] = useTransition()
    const [categories, setCategories] = useState<SelectItemsType[]>([])
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const form = useForm({
        defaultValues: {
            id,
            categoriesId: defaultInputs?.map(item => item.id) || [],
            subject: name
        }
    })

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await makeGetRequest("/admin/categories")
            setCategories(response.data)
        }

        if (categories.length == 0) fetchCategories()
    }, [categories])

    const onSubmit = async (values: Values) => {

        startLoading(async () => {
            const response = await makePatchRequest({ endpoint: "/admin/subjects/update", payload: values })

            if (response.success) {
                setSuccess(response.message)
                setError(undefined)
            }

            if (response.error) {
                setError(response.error)
                setSuccess(undefined)
            }
        })
    }

    if (categories.length === 0) return <div>Loading details...</div>

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>

                <FormMultiSelect
                    form={form}
                    name='categoriesId'
                    label='Categories'
                    placeholder='Categories'
                    selectItems={categories}
                    defaultInputs={defaultInputs}
                />

                <FormInput
                    form={form}
                    label='New subject name'
                    name="subject"
                    inputRest={{
                        autoComplete: "off"
                    }}
                    disabled={isLoading}
                />

                <FormError message={error} />
                <FormSuccess message={success} />

                <Button type='submit'>
                    Update
                </Button>
            </form>
        </Form>
    )
}

export default EditSubject