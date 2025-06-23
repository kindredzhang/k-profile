'use client';

import dynamic from 'next/dynamic';

// Dynamically import the BackToTop component with SSR disabled
const BackToTop = dynamic(
  () => import('@/components/ui/back2top/BackToTop'),
  { ssr: false }
);

export default function ClientBackToTop() {
  return <BackToTop />;
}
