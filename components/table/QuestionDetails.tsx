import { OptionType } from "@/types/quiz"
import parse from "html-react-parser"
import Image from 'next/image'

const QuestionDetails = ({ data }: { data: any }) => {

    return (
        <div className='space-y-8'>
            <div className='prose prose-img:w-1/4 prose-img:h-1/2 border p-2 rounded-md'>
                <strong>Question</strong>{parse(data.question)}
            </div>
            <div className='prose prose-img:w-1/4 prose-img:h-1/2 border p-2 rounded-md'>
            <strong>Explanation</strong>{parse(data.explanation)}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {
                    data.options.map((option: OptionType, i:number) => (
                        <div key={i} className=''>
                            <strong>{`Option ${String.fromCharCode(i + 65)}`}</strong>
                            {
                                option.isImage ? 
                                (
                                    <Image src={option.value} alt={`Option ${String.fromCharCode(i + 65)}`} width={100} height={100} className='border object-contain p-1 rounded-md' />
                                ) : (
                                    <p>
                                        {option.value}
                                    </p>
                                )
                            }
                        </div>
                    ))
                }
            </div>
            <div>
                <strong>Correct answer: </strong> {String.fromCharCode((data.correctAnswer -    1 ) + 65)}
            </div>
        </div>
    )
}

export default QuestionDetails