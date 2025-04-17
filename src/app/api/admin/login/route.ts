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

    if (error || !user) {
      return NextResponse.json(
        { error: error || '登录失败' },
        { status: 401 }
      );
    }

    // 登录成功，设置cookie
    const response = NextResponse.json({ success: true, user });
    
    // 设置cookie，有效期为7天
    response.cookies.set({
      name: 'admin_session',
      value: JSON.stringify({ userId: user.id }),
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7天
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}
