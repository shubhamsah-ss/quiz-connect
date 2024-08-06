import { Form } from '@/components/ui/form'
import { makeGetRequest, makePostRequest } from '@/lib/apiResponse'
import React, { useCallback, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { FormInput, FormSelect } from '../form-inputs'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { Button } from '@/components/ui/button'
import { BottomGradient } from '@/components/BottomGradient'

type Values = {
    subjectId: string,
    topic: string
}
const NewTopicForm = ({ redirect }: { redirect?: () => void }) => {
    const [isLoading, startLoading] = useTransition()

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const [subjects, setSubjects] = useState([])

    const form = useForm({
        defaultValues: {
            subjectId: "",
            topic: ""
        }
    })



    useEffect(() => {
        const fetchSubjects = async () => {

            const response = await makeGetRequest("/admin/subjects")
            setSubjects(response.data)

        }
        if (!subjects) fetchSubjects()
    }, [subjects])

    const onSubmit = async (values: Values) => {
        try {
            startLoading(async () => {
                const response = await makePostRequest({ endpoint: "/admin/topics/create", payload: values, redirect });

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
                <FormSelect
                    form={form}
                    label='Subject'
                    name='subjectId'
                    placeholder='Subject'
                    selectItems={subjects}
                />
                <FormInput
                    label='Topic name'
                    form={form}
                    name='topic'
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
                    Create Topic &rarr;
                    <BottomGradient />
                </Button>
            </form>
        </Form>
    )
}

export default NewTopicForm