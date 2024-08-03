import { ReactNode, Suspense } from "react";

export default function QuestionLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <Suspense>
            {children}
        </Suspense>
    )
}