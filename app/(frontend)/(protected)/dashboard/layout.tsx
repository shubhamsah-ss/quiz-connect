import { ReactNode, Suspense } from "react";

export default function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <Suspense>
            {children}
        </Suspense>
    )
}