import { ReactNode, Suspense } from "react";
import Loading from "./loading";

export default function FrontendLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <main className="bg-white space-y-10 dark:bg-black min-h-[85vh] md:min-h-[87.9vh] mt-[8vh] md:mt-0 p-4 pb-0">
                    {children}
                </main>
            </Suspense>
        </>
    )
}