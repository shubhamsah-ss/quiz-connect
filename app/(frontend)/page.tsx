import { FlipWords } from '@/components/ui/flip-words';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const words: string[] = ["Questions", "Practice", "Experience", "Knowledge", "Skills", "Learning", "Challenges", "Growth"];
const Search = dynamic(() => import("@/components/frontend/Search"))

const Home = () => {

    return (
        <div>
            <div className="h-[25rem] flex justify-center items-center">
                <div className="text-4xl lg:text-6xl xl:text-7xl mx-auto font-semibold text-neutral-800 dark:text-neutral-400">
                    <span className=''>
                        More
                        <Suspense fallback={<p className='animate-bounce'>...</p>}>
                            <FlipWords words={words} className="text-4xl lg:text-6xl xl:text-7xl font-semibold text-neutral-800 dark:text-neutral-400" />
                        </Suspense>
                    </span>
                    <br />
                    <span className="text-lg md:text-5xl lg:text-6xl xl:text-7xl">
                        Dive into a world of questions
                    </span>
                </div>
            </div>

            <Suspense fallback={<p className='animate-pulse'>...</p>}>
                <Search searchButton />
            </Suspense>
        </div>
    )
}

export default Home