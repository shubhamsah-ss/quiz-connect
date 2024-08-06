import { makeGetRequest, makePatchRequest } from '@/lib/apiResponse'
import { SelectItemsType } from '@/types/form'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { FormInput, FormSelect } from '../form-inputs'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

type EditTopicProps = {
    id: string,
    name: string,
    defaultInput: SelectItemsType
}

type Values = {
    id: string,
    topic: string,
    subjectId: string
}

const EditTopic = ({
    id,
    name,
    defaultInput
}:EditTopicProps) => {

    const [isLoading, startLoading] = useTransition()
    const [subjects, setSubjects] = useState<SelectItemsType[]>([])
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const form = useForm({
        defaultValues: {
            id,
            topic: name,
            subjectId: ""
        }
    })

    useEffect(() => {
        const fetchSubjects = async () => {
            const response = await makeGetRequest("/admin/categories")
            setSubjects(response.data)
        }

        if (subjects.length == 0) fetchSubjects()
    }, [subjects])

    const onSubmit = async (values: Values) => {
        if(!values.subjectId || values.subjectId == "") {
            values.subjectId = defaultInput.id
        }

        startLoading(async () => {
            const response = await makePatchRequest({ endpoint: "/admin/topics/update", payload: values })

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

    if (subjects.length === 0) return <div>Loading details...</div>

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>

                <FormSelect
                    form={form}
                    name='subjectId'
                    label='Subjects'
                    placeholder={defaultInput.name}
                    selectItems={subjects}
                />

                <FormInput
                    form={form}
                    label='New topic name'
                    name="topic"
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

export default EditTopic