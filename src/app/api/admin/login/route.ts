import { loginAdmin } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 验证输入
    if (!email || !password) {
      return NextResponse.json(
        { error: '邮箱和密码不能为空' },
        { status: 400 }
      );
    }

    // 调用登录函数
    const { user, error } = await loginAdmin(email, password);

    console.log('Login result:', user, error);
    if (error || !user) {
      return NextResponse.json(
        { error: error || '登录失败' },
        { status: 401 }
      );
    }

    // 登录成功，返回用户信息
    // 注意：Supabase 已经在 cookie 中设置了会话信息，我们不需要手动设置
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}
