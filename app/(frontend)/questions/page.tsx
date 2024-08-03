"use client"
import Heading from '@/components/frontend/Heading'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
const Search = dynamic(()=>import("@/components/frontend/Search"))
const Quiz = dynamic(()=>import("@/components/frontend/Quiz"))

const Questions = () => {

    const searchParams = useSearchParams()
    let category = searchParams.get("category") as string || ""
    let subject = searchParams.get("subject") as string || ""
    let topic = searchParams.get("topic") as string || ""

    
    const questionsOn = topic || subject || category

    const query = {
        ...(category && { category }),
        ...(subject && { subject }),
        ...(topic && { topic })
    };

    return (
        <div className='space-y-10 mb-10'>
            <Heading heading={`Questions on ${questionsOn}`} />

            <Search />

            {
                (!category && !subject && !topic )? (
                    <h4 className='text-xl bg-neutral-300 dark:bg-neutral-900 text-neutral-100 dark:text-neutral-500 p-3 rounded-md w-full max-w-4xl mx-auto text-center'>Select a category to start</h4>
                ): (
                    <Quiz query={query} />
                )
            }

        </div>
    )
}

export default Questions