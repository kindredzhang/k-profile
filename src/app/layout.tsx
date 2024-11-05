import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { NavBar } from '@/components/nav-bar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <NavBar />
          <main className="pt-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}