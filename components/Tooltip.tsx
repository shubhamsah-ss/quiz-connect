import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Tooltip as ToolTip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipArrow } from '@radix-ui/react-tooltip'

type TooltipProps = {
    buttonLabel: string,
    tooltip: string[]
}

const Tooltip = ({ buttonLabel, tooltip }: TooltipProps) => {
    return (

        <TooltipProvider>
            <ToolTip>
                <TooltipTrigger asChild>
                    <Button variant={"secondary"}>{buttonLabel}</Button>
                </TooltipTrigger>
                <TooltipContent  side='bottom'>
                    <TooltipArrow className='dark:text-white' />
                    {
                        tooltip.map((item, i) => (
                            <p key={i}>{item}</p>
                        ))
                    }
                </TooltipContent>
            </ToolTip>
        </TooltipProvider>

    )
}

export default Tooltip
