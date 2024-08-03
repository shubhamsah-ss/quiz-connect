import React, { useCallback, useEffect, useState, useTransition } from 'react'

import { makeGetRequest } from '@/lib/apiResponse'

import { QuizProps } from '@/types/quiz'
import dynamic from 'next/dynamic'
const QuestionCard = dynamic(() => import("@/components/frontend/QuestionCard"))
const QuestionSkeleton = dynamic(() => import("@/components/frontend/QuestionSkeleton"))

const Quiz = ({ query }: QuizProps) => {
    const [isLoading, startLoading] = useTransition()
    const [data, setData] = useState([])

    const fetchData = useCallback(async () => {
        startLoading(async () => {
            // Build query string dynamically
            const queryParams = new URLSearchParams({
                ...(query.category && { category: query.category }),
                ...(query.subject && { subject: query.subject }),
                ...(query.topic && { topic: query.topic })
            }).toString();

            try {
                const response = await makeGetRequest(`/questions?${queryParams}`);
                setData(response.data); // Assuming response is an array of questions
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })

    }, [query]);

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className='w-full max-w-6xl mx-auto space-y-10'>
            {
                isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <QuestionSkeleton key={i} />
                    ))
                ) : (
                    data.map((item, i) => (
                        <QuestionCard key={i} item={item} />
                    ) )
                )
            }
        </div>
    )
}

export default Quiz