'use client';

import dynamic from 'next/dynamic';

// 动态导入鼠标光效组件（客户端专用）
const MouseGlow = dynamic(
  () => import('@/components/ui/mouseglow/MouseGlow'),
  { ssr: false }
);

export default function ClientMouseGlow() {
  return <MouseGlow />;
}
