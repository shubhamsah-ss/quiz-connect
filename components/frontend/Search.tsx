"use client"
import useSearch from '@/hooks/useSearch'
import Link from 'next/link'
import Filter from '@/components/frontend/Filter'



const Search = ({ searchButton }: { searchButton?: boolean }) => {
    const { filterItems, query } = useSearch();

    return (
        <div className="flex flex-wrap flex-col items-center gap-5 md:flex-row justify-evenly">
            {
                filterItems.map((item, i) => (
                    <Filter key={i} placeholder={item.placeholder} options={item.items} onValueChange={item.onValueChange} value={item.value} />
                ))
            }
            {
                searchButton && (
                    <Link href={{ pathname: "/questions", query }} className="relative inline-flex overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-white dark:bg-black px-10 py-2 text-sm font-medium text-neutral-800 dark:text-white backdrop-blur-3xl">
                            Search Questions
                        </span>
                    </Link>
                )
            }
        </div>
    )
}

export default Search