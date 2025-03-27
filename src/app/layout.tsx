import MouseGlow from "@/components/effects/MouseGlow";
import ThemeProvider from "@/components/theme/ThemeProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kindred Zhang",
  description: "一个使用Next.js构建的现代化个人博客",
  keywords: ["博客", "技术", "编程", "前端开发", "Next.js"],
  authors: [{ name: "Kindred Zhang" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* No inline script - using ThemeProvider instead */}
      </head>
      <body className="font-sans antialiased relative overflow-x-hidden">
        <ThemeProvider>
          <MouseGlow />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
