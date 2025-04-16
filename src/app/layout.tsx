import MouseGlow from "@/components/effects/MouseGlow";
import ThemeProvider from "@/components/theme/ThemeProvider";
import type { Metadata } from "next";
import "./globals.css";

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
