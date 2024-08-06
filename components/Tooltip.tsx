import { Button } from "@/components/ui/button"
import {
    Tooltip as ToolTip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

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
                {
                    tooltip.length > 0 && <TooltipContent side='bottom'>
                        <div className='absolute bottom-full left-1/2 -translate-x-1/2 border-b-4 border-b-black dark:border-b-white border-x-4 border-x-transparent'>
                        </div>
                        {
                            tooltip.map((item, i) => (
                                <p key={i} className="my-1">{item}</p>
                            ))
                        }
                    </TooltipContent>
                }
            </ToolTip>
        </TooltipProvider>

    )
}

export default Tooltip
