'use client';

import { logout } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 顶部导航栏 */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard" className="text-xl font-bold">
              Kindred 管理后台
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              返回网站
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700"
            >
              退出登录
            </button>
          </div>
        </div>
      </header>

      {/* 侧边栏和内容区域 */}
      <div className="flex flex-1">
        {/* 侧边栏 */}
        <aside className="w-64 bg-card border-r border-border p-4 hidden md:block">
          <nav className="space-y-1">
            <Link
              href="/admin/dashboard"
              className="block px-4 py-2 rounded-md hover:bg-muted"
            >
              仪表盘
            </Link>
            <Link
              href="/admin/photos"
              className="block px-4 py-2 rounded-md hover:bg-muted"
            >
              照片管理
            </Link>
            <Link
              href="/admin/photos/upload"
              className="block px-4 py-2 rounded-md hover:bg-muted"
            >
              上传照片
            </Link>
          </nav>
        </aside>

        {/* 主内容区域 */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
