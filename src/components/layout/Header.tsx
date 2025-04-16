import ThemeToggle from '@/components/ThemeToggle';
import { CameraIcon, EmailIcon, GitHubIcon, TwitterIcon } from '@/components/ui/icons';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b border-border bg-background/60 backdrop-blur-xl py-2 sticky top-0 z-50 transition-all duration-300 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="font-playfair text-xl text-foreground hover:text-primary transition-colors">
          Kindred
        </Link>

        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-4">
            <Link href="/blog" className="nav-link text-muted-foreground text-sm font-light hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/projects" className="nav-link text-muted-foreground text-sm font-light hover:text-primary transition-colors">
              Projects
            </Link>
            {/* <Link href="/talks" className="nav-link text-muted-foreground text-sm font-light hover:text-primary transition-colors">
              Talks
            </Link> */}
            <Link href="/about" className="nav-link text-muted-foreground text-sm font-light hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <a href="/photo" className="text-foreground hover:text-primary transition-colors p-1.5">
              <CameraIcon className="w-4 h-4" />
            </a>
            <a href="https://github.com/kindredzhang" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors p-1.5">
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a href="https://twitter.com/wanchun__" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors p-1.5">
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a href="mailto:kindred.zhang.life@gmail.com" className="text-foreground hover:text-primary transition-colors p-1.5">
              <EmailIcon className="w-4 h-4" />
            </a>
            <div className="border-l border-border h-4 mx-1"></div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
