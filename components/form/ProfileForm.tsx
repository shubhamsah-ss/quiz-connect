"use client"
import { FormImage, FormInput } from '@/components/form/form-inputs'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { makePatchRequest } from '@/lib/apiResponse'
import { ProfileSchema } from '@/schema/formSchemas'
import { UserType } from '@/types/user'
import { format, parseISO } from "date-fns"
import { Edit2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "sonner"
import { z } from 'zod'

const ProfileForm = ({ user }: { user: UserType | null }) => {
    const [isLoading, startLoading] = useTransition()
    const [isEditable, startEditing] = useState(false)

    const emailVerified = user?.emailVerified
        ? format(parseISO(user.emailVerified), "dd MMMM yyyy")
        : "";


    const form = useForm({
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            image: user?.image || "",
            emailVerified: emailVerified || ""
        }
    })

    useEffect(() => {
        if (user) {
            form.setValue("name", user?.name || "")
            form.setValue("email", user?.email || "")
            form.setValue("image", user?.image || "")
            form.setValue("emailVerified", emailVerified || "")
        }
    }, [user, form, emailVerified])

    if (!user) return;

    const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
        startLoading(async () => {
            values.email = user.email
            values.emailVerified = user.emailVerified
            const response = await makePatchRequest({ endpoint: "/users", payload: values })
            const data = response.data
            if (response.success) {
                toast.success(response.message)
                await signIn() // for now, session.update is not working
            }
            if (response.error) toast.error(response.error.message)
        })
    }


    return (
        <div className='relative'>
            <Button onClick={() => startEditing(prev => !prev)} variant={"outline"} className='absolute border-0 -top-3 -right-3 md:-top-7 md:-right-7 flex items-center'>
                <Edit2 className='h-4 w-4 mr-1' />
                Edit
            </Button>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    {!user.isOAuth && <FormImage
                        src={user.image}
                        alt={user.name}
                        disabled={!isEditable || isLoading || user.isOAuth as boolean}
                        form={form}
                    />}
                    <div className='grid grid-cols-1
                    md:grid-cols-2 gap-8'>
                        <FormInput
                            name='name'
                            disabled={!isEditable || isLoading}
                            form={form}
                            label='Name'
                        />
                        <FormInput
                            name='email'
                            disabled={true}
                            form={form}
                            label='Email'
                            inputRest={{
                                readOnly: true
                            }}
                        />
                        <FormInput
                            name='emailVerified'
                            disabled={true}
                            form={form}
                            label='Verified'
                            inputRest={{
                                readOnly: true
                            }}
                        />
                    </div>

                    {
                        isEditable && <Button disabled={isLoading} variant={"outline"} className='mx-auto'>
                            Save
                        </Button>
                    }
                </form>
            </Form>
        </div>
    )
}

export default ProfileForm