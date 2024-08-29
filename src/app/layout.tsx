import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import "./globals.css";

import SessionProvider from '@/components/session-provider';
import { getServerSession } from "next-auth";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: "Open Source Smith",
  description: "A platform for sharing and discovering open source templates",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body className={cn("min-h-screen bg-background font-sans antialiased flex flex-col", fontSans.variable)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem>
            <Header />

            <main className="flex-1">
              {children}
            </main>
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
