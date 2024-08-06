"use client"
import { Form } from '@/components/ui/form'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { FormInput } from '../form-inputs'
import { makePatchRequest } from '@/lib/apiResponse'
import { Button } from '@/components/ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'

type EditCategoryProps = {
    id: string,
    name: string
}

type Values = {
    id: string,
    category: string
}

const EditCategory = ({ id, name }: EditCategoryProps) => {
    const [isLoading, startLoading] = useTransition()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const form = useForm({
        defaultValues: {
            id,
            category: name
        }
    })

    const onSubmit = async (values: Values) => {
        startLoading(async () => {
            const response = await makePatchRequest({ endpoint: "/admin/categories/update", payload: values })

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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormInput
                    form={form}
                    label='New category name'
                    name="category"
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

export default EditCategory