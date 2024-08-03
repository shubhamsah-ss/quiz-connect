"use client"
import { columns } from '@/components/table/QuestionColumns'
import { QuestionDataTable } from '@/components/table/QuestionDataTable'
import { makeGetRequest } from '@/lib/apiResponse'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { QuestionsType } from '@/types/quiz'

const MyQuestions = () => {
    const [data, setData] = useState<QuestionsType[]>([])

    const fetchQuestions = useCallback(async () => {
        const response = await makeGetRequest("/questions/user")
        setData(response.data)
    }, [])

    useEffect(() => {
        fetchQuestions()
    }, [fetchQuestions])

    return (
        <div>
            <div className='flex justify-end p-2'>
                <Button
                    variant={"outline"}
                    size={"sm"}
                    className=''
                    onClick={fetchQuestions}
                >
                    Refresh
                </Button>
            </div>
            <div className='rounded-md border'>

                <div className='flex flex-col md:flex-row justify-between m-2 items-center'>

                </div>

                <QuestionDataTable columns={columns} data={data} />
            </div>
        </div>
    )
}

export default MyQuestions