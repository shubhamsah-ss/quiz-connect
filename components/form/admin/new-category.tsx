import { Form } from '@/components/ui/form'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { FormInput } from '../form-inputs'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { Button } from '@/components/ui/button'
import { BottomGradient } from '@/components/BottomGradient'
import { makePostRequest } from '@/lib/apiResponse'

type Values = {
    category: string
}

const NewCategoryForm = ({ redirect }: {redirect?: Function}) => {
    const [isLoading, startLoading] = useTransition()
    
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const form = useForm({
        defaultValues: {
            category: ""
        }
    })

    const onSubmit = async(values:Values) => {
        try {
            startLoading(async () => {
                const response = await makePostRequest({ endpoint: "/admin/categories/create", payload: values, redirect });

                if (response.success) {
                    setSuccess(response.message);
                    setError(undefined); // Clear error on success
                }

                if (response.error) {
                    setError(response.error);
                    setSuccess(undefined); // Clear success on error
                }
            });
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    }
    return (

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormInput
                    label='Category name'
                    form={form}
                    name='category'
                    disabled={isLoading}
                    inputRest={{
                        autoComplete: "off",
                        required: true
                    }}
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isLoading}
                        variant={"outline"}
                        className="bg-gradient-to-br relative group/btn from-white dark:from-zinc-900 dark:to-zinc-900 to-neutral-300 block dark:bg-zinc-800 w-full dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        Create Category &rarr;
                        <BottomGradient />
                    </Button>
                </form>
            </Form>
    )
}

export default NewCategoryForm