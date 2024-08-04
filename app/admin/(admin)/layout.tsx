import AdminSidebar from "@/components/admin/AdminSidebar";
import { cn } from "@/lib/utils";
import { ReactNode, Suspense } from "react";

export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row w-full flex-1 mx-auto overflow-hidden",
                
            )}
        >
            <AdminSidebar />
            <Suspense>
                <main className="bg-white space-y-10 dark:bg-black p-4">
                    {children}
                </main>
            </Suspense>
        </div>
    )
}