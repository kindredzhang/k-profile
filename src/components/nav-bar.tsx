'use client'

import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { ClientOnly } from './client-only'

const navItems = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/talks', label: 'Talks' },
  { href: '/sponsors', label: 'Sponsors' },
]

export function NavBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/75 dark:bg-black/75 border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold">
              Logo
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-2 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              >
                {label}
              </Link>
            ))}
            <ClientOnly>
              <ThemeToggle />
            </ClientOnly>
          </div>
        </div>
      </nav>
    </header>
  )
}