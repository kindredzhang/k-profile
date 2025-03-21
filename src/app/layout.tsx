import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import MouseGlow from "@/components/effects/MouseGlow";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

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
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            function getThemePreference() {
              if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                return localStorage.getItem('theme');
              }
              return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            
            const theme = getThemePreference();
            document.documentElement.classList.toggle('dark', theme === 'dark');
            document.body.classList.toggle('dark', theme === 'dark');
          })();
        `}} />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased relative overflow-x-hidden`}>
        <MouseGlow />
        {children}
      </body>
    </html>
  );
}
