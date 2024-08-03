import { IconCircleCheckFilled } from "@tabler/icons-react";

interface FormSuccessProps {
    message?: string
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
    if (!message) return null;

    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex item-center gap-x-2 text-sm text-emerald-500">
            <IconCircleCheckFilled className="h-4 w-4" />
            <p>{message}</p>
        </div>
    )
}