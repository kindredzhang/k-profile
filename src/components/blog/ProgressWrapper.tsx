'use client';

import dynamic from 'next/dynamic';

// 动态导入客户端组件并禁用SSR
const ClientReadingProgress = dynamic(
  () => import('./ClientReadingProgress'),
  { ssr: false }
);

export default function ProgressWrapper() {
  return <ClientReadingProgress />;
}
