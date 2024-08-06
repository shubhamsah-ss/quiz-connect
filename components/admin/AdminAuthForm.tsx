"use client"
import { Button } from '@/components/ui/button'
import { makePostRequest } from '@/lib/apiResponse'
import { IconArrowLeft } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { BottomGradient } from '../BottomGradient'
import { FormError } from '../form/form-error'
import { FormInput } from '../form/form-inputs'
import { FormSuccess } from '../form/form-success'
import { Form } from '../ui/form'
import { AdminPinSchema } from '@/schema/formSchemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'

const AdminAuthForm = () => {
    const [isLoading, startLoading] = useTransition()

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const router = useRouter()

    const { update, data } = useSession()

    const form = useForm({
        resolver: zodResolver(AdminPinSchema),
        defaultValues: {
            adminPin: ""
        }
    })

    // const updateSession = async () => {
    //     await update({
    //         ...data,
    //         user: {
    //             ...data?.user,
    //             adminAuth: true
    //         }
    //     })
    // }

    function redirect(){
        router.replace("/admin/dashboard")
    }

    const onSubmit = async (values: z.infer<typeof AdminPinSchema>) => {
        try {
            startLoading(async () => {
                const response = await makePostRequest({ endpoint: "/admin/auth", payload: values, redirect });
                
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
        <div className="rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black space-y-10">
            <div className="flex items-center space-x-3">
                <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
                    <IconArrowLeft />
                </Button>

                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Back
                </h2>
            </div>

            <Form {...form}>
                <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInput
                        label='Admin PIN'
                        form={form}
                        name='adminPin'
                        disabled={isLoading}
                        type='password'
                        inputRest={{
                            autoComplete: "off",
                            inputMode: "numeric",
                            maxLength: 4,
                            minLength: 4
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
                        Login &rarr;
                        <BottomGradient />
                    </Button>

                </form>
            </Form>
        </div>
    )
}

export default AdminAuthForm