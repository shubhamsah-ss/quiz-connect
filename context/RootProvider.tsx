import { ThemeProvider } from "@/context/ThemeProvider";
import { Toaster } from "sonner";

const RootProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (

        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <Toaster />
        </ThemeProvider>
    )
}

export default RootProvider