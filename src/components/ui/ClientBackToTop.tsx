'use client';

import dynamic from 'next/dynamic';

// Dynamically import the BackToTop component with SSR disabled
const BackToTop = dynamic(
  () => import('./BackToTop'),
  { ssr: false }
);

export default function ClientBackToTop() {
  return <BackToTop />;
}
