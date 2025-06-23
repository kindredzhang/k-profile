import "@/app/globals.css";
import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/header";
import MainContent from "@/components/layout/MainContent";
import ThemeProvider from "@/components/theme/ThemeProvider";
import ClientBackToTop from "@/components/ui/back2top/ClientBackToTop";
import ClientMouseGlow from "@/components/ui/mouseglow/ClientMouseGlow"; // 注意：您有两个MouseGlow，这里我们使用Client版本

export const metadata: Metadata = {
  title: "Kindred Zhang",
  description: "A modern personal blog built with Next.js",
  keywords: ["blog", "technology", "programming", "frontend development", "Next.js", "code", "live"],
  authors: [{ name: "Kindred Zhang" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head />
      <body className="font-sans antialiased bg-gray-50 dark:bg-[#050505] relative w-screen overflow-x-hidden">
        <ThemeProvider>
          <div className="dot-pattern"></div>
          <div className="gradient-sphere absolute top-40 left-1/4 w-96 h-96 opacity-50 dark:opacity-30"></div>
          <div className="gradient-sphere absolute bottom-40 right-1/4 w-80 h-80 opacity-50 dark:opacity-30"></div>

          <ClientMouseGlow />
          <ClientBackToTop />
          <div className="flex flex-col min-h-screen">
            <Header />
            <MainContent>{children}</MainContent>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}