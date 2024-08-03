import Footer from "@/components/frontend/Footer";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const Navbar = dynamic(() => import("@/components/frontend/Navbar"))

export default function FrontendLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <>
            <Navbar />
            <main className="bg-white space-y-10 dark:bg-black min-h-[85vh] md:min-h-[87.9vh] mt-[8vh] md:mt-0 p-4 pb-0">
                {children}
            </main>
            <Footer />
        </>
    )
}