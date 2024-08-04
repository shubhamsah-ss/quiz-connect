import { makeGetRequest } from '@/lib/apiResponse';
import { QuestionsType, QuizProps } from '@/types/quiz';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';

const QuestionCard = dynamic(() => import("@/components/frontend/QuestionCard"));
const QuestionSkeleton = dynamic(() => import("@/components/frontend/QuestionSkeleton"));

const Quiz = ({ query }: QuizProps) => {
    const [isLoading, startLoading] = useTransition();
    const [dataState, setData] = useState<QuestionsType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);

    const data = useMemo(() => dataState, [dataState]);

    const lastItemRef = useCallback((node: HTMLDivElement | null) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prev) => prev + 1);
            }
        }, {
            rootMargin: '100px',
        });

        if (node) observer.current.observe(node);
    }, [hasMore, isLoading]);

    const fetchData = useCallback(async (page: number) => {
        if (isLoading) return; // Prevent overlap
        startLoading(async () => {
            const queryParams = new URLSearchParams({
                ...(query.category && { category: query.category }),
                ...(query.subject && { subject: query.subject }),
                ...(query.topic && { topic: query.topic }),
                page: page.toString(),
            }).toString();

            try {
                const response = await makeGetRequest(`/questions?${queryParams}`);

                if (response.data?.length === 0) {
                    setHasMore(false);
                } else {
                    setData((prev) => {
                        const newItems = response.data.filter(
                            (newItem: QuestionsType) => !prev.some(item => item.id === newItem.id)
                        );
                        return [...prev, ...newItems];
                    });
                }
            } catch (error) {
                
            }
        });
    }, [query]);

    useEffect(() => {
        fetchData(page);
    }, [fetchData, page]);

    return (
        <div className='w-full max-w-6xl mx-auto space-y-10'>
            {data.map((item, i) => (
                <div
                    key={`${item.id}-${i}`}
                    ref={i === data.length - 1 ? lastItemRef : null}
                >
                    <QuestionCard item={item} />
                </div>
            ))}
            {isLoading && Array.from({ length: 5 }).map((_, i) => (
                <QuestionSkeleton key={i} />
            ))}
        </div>
    );
};

export default Quiz;
