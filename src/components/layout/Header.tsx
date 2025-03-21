import ThemeToggle from '@/components/ThemeToggle';
import { CameraIcon, EmailIcon, GitHubIcon, TwitterIcon } from '@/components/ui/icons';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b border-border bg-background/60 backdrop-blur-xl py-2 sticky top-0 z-50 transition-all duration-300 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="font-playfair text-base font-bold text-foreground hover:text-primary transition-colors">
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
            <Link href="/talks" className="nav-link text-muted-foreground text-sm font-light hover:text-primary transition-colors">
              Talks
            </Link>
            <Link href="/sponsors" className="nav-link text-muted-foreground text-sm font-light hover:text-primary transition-colors">
              Sponsors
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
            
            {/* 移动端菜单按钮 */}
            <button className="md:hidden text-foreground hover:text-primary transition-colors p-2 ml-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"/>
                <line x1="4" x2="20" y1="6" y2="6"/>
                <line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
