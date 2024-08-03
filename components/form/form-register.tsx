"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import Socials from '@/components/form/Socials';
import { BottomGradient } from '../BottomGradient';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form/form-error';
import { FormSuccess } from '@/components/form/form-success';
import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';
import { signUpSchema } from '@/schema/formSchemas';
import { FormInput } from '@/components/form/form-inputs';
import { makePostRequest } from '@/lib/apiResponse';

const RegisterForm = () => {
    const [isLoading, startLoading] = useTransition()

    const router = useRouter()

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const form = useForm({

        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        mode: "all",
    })


    function redirect() {
        setTimeout(() => {
            router.replace("/login")
        }, 2000)
    }

    const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
        try {
            startLoading(async () => {
                const response = await makePostRequest({ endpoint: "/auth/register", payload: values, redirect });

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
    };

    return (
        <div className="rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black space-y-10">
            <div className="flex items-center space-x-3">
                <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
                    <IconArrowLeft />
                </Button>

                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Register
                </h2>
            </div>

            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInput
                        form={form}
                        disabled={isLoading}
                        name="name"
                        label="Full name"
                    />

                    <FormInput
                        form={form}
                        disabled={isLoading}
                        name="email"
                        label="Email"
                        type='email'
                    />

                    <FormInput
                        form={form}
                        disabled={isLoading}
                        name="password"
                        label="Password"
                        type="password"
                    />

                    <FormInput
                        form={form}
                        disabled={isLoading}
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                    />

                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isLoading}
                        variant={"outline"}
                        className="bg-gradient-to-br relative group/btn from-white dark:from-zinc-900 dark:to-zinc-900 to-neutral-300 block dark:bg-zinc-800 w-full dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        Sign up &rarr;
                        <BottomGradient />
                    </Button>



                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                    <Socials />

                    <div className="flex justify-center">
                        <Button variant={"link"} size={"sm"} className="mx-0 px-0">
                            <Link href={"/login"} className="text-center">Login?</Link>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default RegisterForm