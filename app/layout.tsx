import RootProvider from "@/context/RootProvider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz Connect",
  description: "Dive into a world of questions, practice, and experience designed to boost your knowledge and skills. Whether you're preparing for exams or just looking to expand your horizons, our platform provides the tools and resources you need to succeed .",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
