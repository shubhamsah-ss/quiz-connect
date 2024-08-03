import { IconAlertTriangleFilled } from "@tabler/icons-react";

interface FormErrorProps {
    message?: string
}

export const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null;

    return (
        <div className="bg-destructive/15 p-3 rounded-md flex item-center gap-x-2 text-sm text-destructive">
            <IconAlertTriangleFilled className="h-4 w-4" />
            <p>{message}</p>
        </div>
    )
}