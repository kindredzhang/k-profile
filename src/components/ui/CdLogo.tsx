'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function SiteLogo() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <Link href="/" className="font-pacifico text-xl text-foreground hover:text-primary transition-colors">
      {isHomePage ? '' : 'cd'}
    </Link>
  );
}
