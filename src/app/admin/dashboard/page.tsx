'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { getCurrentUser, isLoggedIn } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查用户是否已登录
    if (!isLoggedIn()) {
      router.push('/admin/login');
      return;
    }

    // 获取当前用户信息
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>加载中...</p>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">管理员仪表盘</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <h2 className="text-lg font-semibold mb-2">欢迎回来</h2>
            <p className="text-muted-foreground">
              {user?.email}
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <h2 className="text-lg font-semibold mb-2">照片管理</h2>
            <p className="text-muted-foreground mb-4">
              管理您的照片集
            </p>
            <button 
              onClick={() => router.push('/admin/photos')}
              className="text-primary hover:underline"
            >
              查看照片 →
            </button>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <h2 className="text-lg font-semibold mb-2">上传照片</h2>
            <p className="text-muted-foreground mb-4">
              上传新的照片到您的集合
            </p>
            <button 
              onClick={() => router.push('/admin/photos/upload')}
              className="text-primary hover:underline"
            >
              上传照片 →
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
