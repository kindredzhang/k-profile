'use client';

import dynamic from 'next/dynamic';

// 动态导入阅读进度条组件（客户端专用）
const ReadingProgress = dynamic(
  () => import('./ReadingProgress'),
  { ssr: false }
);

export default function ClientReadingProgress() {
  return <ReadingProgress />;
}
