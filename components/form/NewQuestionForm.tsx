"use client"
import { makeGetRequest, makePostRequest } from '@/lib/apiResponse'
import { QuestionSchema } from '@/schema/formSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import Editor from '@/components/editor/Editor'
import { FormError } from '@/components/form/form-error'
import { FormSuccess } from '@/components/form/form-success'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {FormSelect} from '@/components/form/form-inputs'

const correctOptions = [
    {
        id: "1",
        name: "A"
    },
    {
        id: "2",
        name: "B"
    },
    {
        id: "3",
        name: "C"
    },
    {
        id: "4",
        name: "D"
    }
]

const NewQuestionForm = () => {
    const [isLoading, startLoading] = useTransition()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([])
    const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([])
    const [topics, setTopics] = useState<{ id: string; name: string }[]>([])


    const form = useForm({
        resolver: zodResolver(QuestionSchema),
        defaultValues: {
            question: "",
            options: [
                { value: "", isImage: false, fileName: "" },
                { value: "", isImage: false, fileName: "" },
                { value: "", isImage: false, fileName: "" },
                { value: "", isImage: false, fileName: "" },
            ],
            correctAnswer: "",
            explanation: "",
            categoryId: "",
            subjectId: "",
            topicId: ""
        }
    })

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await makeGetRequest("categories")
            setCategories(response.data)
        }

        fetchCategories()
    }, [])

    const fetchSubjects = useCallback(async (categoryName: string) => {
        const response = await makeGetRequest(`/subjects?category=${categoryName}`)
        setSubjects(response.data)
    }, [])

    const fetchTopics = useCallback(async (subjectName: string) => {
        const response = await makeGetRequest(`/topics?subject=${subjectName}`)
        setTopics(response.data)
    }, [])

    useEffect(() => {
        const subscription = form.watch((value) => {
            if (value.categoryId) {
                const category = categories.find(cat => cat.id === value.categoryId)
                if (category) fetchSubjects(category.name)
            }
            if (value.subjectId) {
                const subject = subjects.find(sub => sub.id === value.subjectId)
                if (subject) fetchTopics(subject.name)
            }
        })

        return () => subscription.unsubscribe()
    }, [form, fetchSubjects, fetchTopics, categories, subjects])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event.target.files?.[0]
        if (!file) return

        const reader = new FileReader()

        reader.onloadend = () => {
            const newOptions = form.getValues("options") || []
            newOptions[index] = { value: reader.result as string, isImage: true, fileName: file.name }
            form.setValue("options", newOptions)
        }

        reader.readAsDataURL(file)
    }

    const handleInputChange = (value: string, index: number) => {
        const newOptions = form.getValues("options") || []
        newOptions[index] = { value, isImage: false, fileName: "" }
        form.setValue("options", newOptions)
    }

    type DataType = {
        success?: boolean,
        message?: string,
        error?: string
    }

    const [data, setData] = useState<DataType | undefined>(undefined)

    const onSubmit = async (formValues: z.infer<typeof QuestionSchema>) => {
        const values = {
            ...formValues,
            options: formValues.options.map(option => ({
                value: option.isImage ? option.value : option.value,
                isImage: option.isImage,
                fileName: option.fileName
            }))
        }
        try {
            startLoading(async () => {
                const response = await makePostRequest({ endpoint: "/questions/create", payload: values });
                setData(response)
            });
        } catch (error) {
            setError("An error occurred. Please try again.");
        }

    }

    useEffect(() => {
        if (data) {
            if (data.success) {
                setSuccess(data.message);
                setError(undefined); // Clear error on success
                form.reset()
            }

            if (data.error) {
                setError(data.error);
                setSuccess(undefined); // Clear success on error
            }
        }
    }, [data, form])

    return (
        <div className="w-full max-w-7xl shadow-md drop-shadow-md mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black space-y-10">
            <div className="flex items-center space-x-3">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Add Question
                </h2>
            </div>

            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <Controller
                        control={form.control}
                        name="question"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="question">
                                    Question
                                </FormLabel>
                                <FormControl>
                                    <Editor id='question' value={field.value} onValueChange={field.onChange} />
                                </FormControl>
                                {/* <FormMessage /> */}
                                {
                                    form.formState.errors.question && <p className='text-sm font-medium text-destructive'>
                                        {form.formState.errors.question.message}
                                    </p>
                                }
                            </FormItem>
                        )}
                    />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        {form.watch("options").map((option, index) => (
                            <FormField
                                key={index}
                                disabled={isLoading}
                                control={form.control}
                                name={`options.${index}.value`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor={`option${index + 1}`}>
                                            Option {String.fromCharCode(65 + index)}
                                        </FormLabel>
                                        <FormControl>
                                            <>
                                                <Input id={`option${index + 1}`} type="text"
                                                    {...field}
                                                    autoComplete='off'
                                                    value={option.isImage ? option.fileName || "" : field.value}
                                                    onChange={(e) => {
                                                        handleInputChange(e.target.value, index)
                                                        field.onChange(e)
                                                    }}
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(event) => handleImageChange(event, index)}
                                                />
                                            </>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        <FormSelect
                            name='categoryId'
                            label="Category"
                            placeholder='Select a category'
                            selectItems={categories}
                            form={form}
                        />
                        <FormSelect
                            name='subjectId'
                            label="Subject"
                            placeholder='Select a subject'
                            selectItems={subjects}
                            form={form}
                        />
                        <FormSelect
                            name='topicId'
                            label="Topic"
                            placeholder='Select a topic'
                            selectItems={topics}
                            form={form}
                        />
                        <FormSelect
                            name='correctAnswer'
                            label="Correct option"
                            placeholder='Select the correct option'
                            selectItems={correctOptions}
                            form={form}
                        />
                    </div>
                    <Controller
                        control={form.control}
                        name="explanation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="explanation">
                                Explanation
                                </FormLabel>
                                <FormControl>
                                    <Editor id='explanation' value={field.value} onValueChange={field.onChange} />
                                </FormControl>
                                {/* <FormMessage /> */}
                                {
                                    form.formState.errors.explanation && <p className='text-sm font-medium text-destructive'>
                                        {form.formState.errors.explanation.message}
                                    </p>
                                }
                            </FormItem>
                        )}
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isLoading}
                        variant={"outline"}
                        className=""
                        type="submit"
                    >
                        Add Question
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default NewQuestionForm
