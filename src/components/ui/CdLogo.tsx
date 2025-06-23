'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CdLogo() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <Link href="/" className="font-pacifico text-xl text-foreground hover:text-primary transition-colors">
      {isHomePage ? '' : 'cd'}
    </Link>
  );
}
