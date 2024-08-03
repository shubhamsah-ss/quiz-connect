import AuthProvider from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Toaster } from "sonner"

const RootProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <AuthProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster />
            </ThemeProvider>
        </AuthProvider>
    )
}

export default RootProvider