'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CdLogo() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (isHomePage) return null;

  return (
    <Link 
      href="/" 
      className="group relative inline-flex items-center"
      title="Back to home"
    >
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Main logo container */}
        <div className="relative px-3 py-1 rounded-lg border border-border/30 bg-card/50 backdrop-blur-sm group-hover:border-primary/40 group-hover:bg-card/80 transition-all duration-300">
          <span className="font-mono text-lg font-bold text-primary group-hover:text-primary/90 transition-colors duration-300">
            cd
          </span>
          <span className="ml-1 text-xs text-muted-foreground/60 group-hover:text-primary/60 transition-colors duration-300">
            ~
          </span>
        </div>
        
        {/* Subtle cursor indicator */}
        <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-0.5 h-4 bg-primary/60 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
      </div>
    </Link>
  );
}
