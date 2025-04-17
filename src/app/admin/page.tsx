'use client';

import { isLoggedIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // 检查用户是否已登录
    if (isLoggedIn()) {
      router.push('/admin/dashboard');
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>正在重定向...</p>
    </div>
  );
}
