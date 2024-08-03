import { Card, CardContent, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const QuestionSkeleton = () => {
    return (
        <Card>
            <CardHeader>
                <Skeleton className='h-40 lg:h-56 rounded-md' />
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                <Skeleton className='h-5 lg:h-10' />
                <Skeleton className='h-5 lg:h-10' />
                <Skeleton className='h-5 lg:h-10' />
                <Skeleton className='h-5 lg:h-10' />
            </CardContent>
        </Card>
    )
}

export default QuestionSkeleton