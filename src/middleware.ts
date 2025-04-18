import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

// 不需要认证的路径白名单
const publicPaths = [
  '/',
  '/blog',
  '/blog/(.*)',
  '/projects',
  '/photo',
  '/api/admin/login',
  '/api/admin/register',
  '/admin/login',
  '/admin/register',
];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  // 检查是否是公开路径
  const isPublicPath = publicPaths.some(path => {
    if (path.includes('(.*)')) {
      const basePath = path.replace('(.*)', '');
      return pathname === basePath || pathname.startsWith(`${basePath}/`);
    }
    return pathname === path;
  });

  // 如果是公开路径，直接放行
  if (isPublicPath) {
    return res;
  }

  // 检查是否是管理员API或页面
  const isAdminPath = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
  
  if (isAdminPath) {
    // 创建Supabase客户端
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) {
            return req.cookies.get(name)?.value;
          },
          set(name, value, options) {
            req.cookies.set({
              name,
              value,
              ...options,
            });
            res.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name, options) {
            req.cookies.set({
              name,
              value: '',
              ...options,
            });
            res.cookies.set({
              name,
              value: '',
              ...options,
            });
          },
        },
      }
    );
    
    // 获取会话
    const { data: { session } } = await supabase.auth.getSession();
    
    // 如果没有会话且是API请求，返回401
    if (!session && pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: '未授权，请先登录' },
        { status: 401 }
      );
    }
    
    // 如果没有会话且是页面请求，重定向到登录页
    if (!session && pathname.startsWith('/admin/')) {
      const redirectUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

// 配置中间件应用的路径
export const config = {
  matcher: [
    /*
     * 匹配所有路径，除了:
     * - 静态文件 (如 /favicon.ico, /images/*)
     * - 公共文件 (如 /robots.txt)
     * - _next (Next.js内部路径)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|robots.txt).*)',
  ],
};
