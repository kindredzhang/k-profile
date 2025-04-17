'use client';

import { Button } from '@/components/ui/button';
import { isLoggedIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 如果已登录，重定向到管理员仪表盘
  useEffect(() => {
    if (isLoggedIn()) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || '登录失败');
        setLoading(false);
        return;
      }

      // 登录成功，保存用户信息到会话存储
      if (data.user) {
        sessionStorage.setItem('admin_user', JSON.stringify(data.user));
      }

      // 重定向到管理员仪表盘
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('登录过程中发生错误');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">管理员登录</h1>
          <p className="text-muted-foreground mt-2">请登录以访问管理后台</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              邮箱
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4"
              disabled={loading}
            >
              {loading ? '登录中...' : '登录'}
            </Button>
          </div>
{/* 
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              还没有账号？{' '}
              <button
                type="button"
                onClick={() => router.push('/admin/register')}
                className="text-primary hover:underline focus:outline-none"
              >
                注册新账号
              </button>
            </p>
          </div> */}
        </form>
      </div>
    </div>
  );
}
