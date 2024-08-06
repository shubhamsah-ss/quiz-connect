import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { MouseEvent } from "react"

type AlertMessageProps = {
    trigger: string,
    title?: string,
    description?: string,
    onConfirm: (event: MouseEvent<HTMLButtonElement>) => void
}

const AlertMessage = ({
    trigger,
    title = "Are you absolutely sure?",
    description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    onConfirm,
}:AlertMessageProps) => {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button variant={"outline"} size={"sm"} className="text-red-500 hover:text-red-700">{trigger}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default AlertMessage