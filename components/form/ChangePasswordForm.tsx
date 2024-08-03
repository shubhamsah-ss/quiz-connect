"use client"
import React, { useTransition } from 'react'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { FormInput } from '@/components/form/form-inputs'
import { Button } from '../ui/button'
import { z } from 'zod'
import { PasswordSchema } from '@/schema/formSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { makePatchRequest } from '@/lib/apiResponse'
import { toast } from 'sonner'

const ChangePasswordForm = () => {
    const [isLoading, startLoading] = useTransition()
    const form = useForm({
        resolver: zodResolver(PasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })


    const onSubmit = async (values: z.infer<typeof PasswordSchema>) => {
        startLoading(async () => {
            const response = await makePatchRequest({ endpoint: "/auth/change-password", payload: values })
            console.log(response)
            if (response.success) {
                toast.success(response.message)
                form.reset()
            } else {
                toast.error(response.error)
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormInput
                    disabled={isLoading}
                    name='password'
                    label="New Password"
                    form={form}
                    type='password'
                />

                <FormInput
                    disabled={isLoading}
                    name='confirmPassword'
                    label="Confirm Password"
                    form={form}
                    type='password'
                />

                <div className='flex justify-end'>
                    <Button disabled={isLoading} type='submit' variant={"outline"}>
                        Change
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default ChangePasswordForm