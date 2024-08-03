"use client";
import { FormError } from "@/components/form/form-error";
import { FormSuccess } from "@/components/form/form-success";
import { Button } from "@/components/ui/button";
import {
    Form
} from "@/components/ui/form";
import { makePostRequest } from "@/lib/apiResponse";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signInSchema } from "@/schema/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BottomGradient } from "../BottomGradient";
import { FormInput } from "./form-inputs";
import Socials from "./Socials";

export default function LoginForm() {
    const searchParams = useSearchParams()
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different account"
        : ""



    const [isLoading, startLoading] = useTransition()
    const router = useRouter()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "all",
    })

    function redirect() {
        router.replace(DEFAULT_LOGIN_REDIRECT)
    }

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        try {
            startLoading(async () => {
                const response = await makePostRequest({ endpoint: "/auth/login", payload: values, redirect });

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
                    Login
                </h2>
            </div>

            <Form {...form}>
                <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInput
                        name="email"
                        type="email"
                        label="Email"
                        disabled={isLoading}
                        form={form}
                    />

                    <FormInput
                        name="password"
                        type="password"
                        label="Password"
                        disabled={isLoading}
                        form={form}
                    />

                    <FormError message={error || urlError} />
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

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                    <Socials />

                    <div className="flex justify-center">
                        <Button variant={"link"} size={"sm"} className="mx-0 px-0">
                            <Link href={"/register"} className="text-center">Register?</Link>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

