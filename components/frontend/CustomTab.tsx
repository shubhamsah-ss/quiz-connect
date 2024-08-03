import React, { ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from '@/lib/utils'

interface CustomTabContentProps {
    defaultValue: string,
    tabList: {
        value: string,
        label: string,
        className?: string
    }[],
    tabContent: {
        value: string,
        content: ReactNode,
        className?: string
    }[],
    tabParentClass?: string,
    tabListClass?: string,
    handleValueChange: Function
}


const CustomTab = ({defaultValue, tabContent, tabList, tabParentClass, tabListClass, handleValueChange}:CustomTabContentProps) => {
    return (
        <Tabs defaultValue={defaultValue} onValueChange={(value) => handleValueChange(value)} className={cn("space-y-10", tabParentClass)}>
            <TabsList className={cn("bg-background h-16 shadow-md drop-shadow-md dark:shadow-neutral-800", tabListClass)}>
                {
                    tabList.map(tab => (
                        <TabsTrigger className={cn("px-6 py-3 data-[state=active]:bg-neutral-200 dark:data-[state=active]:bg-neutral-800 hover:text-black dark:hover:text-white mx-1", tab.className)} key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>

                    ))
                }

            </TabsList>
            {
                tabContent.map(tab => (
                    <TabsContent className={cn("", tab.className)} key={tab.value} value={tab.value}>
                        {tab.content}
                    </TabsContent>
                ))
            }
        </Tabs>
    )
}

export default CustomTab