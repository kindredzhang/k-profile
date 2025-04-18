import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  try {
    const { email, password } = await request.json();

    // 验证输入
    if (!email || !password) {
      return NextResponse.json(
        { error: '邮箱和密码不能为空' },
        { status: 400 }
      );
    }

    // 使用 Supabase Auth 注册新用户
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Error registering user:', error);
      return NextResponse.json(
        { error: error.message || '注册失败，请稍后再试' },
        { status: 500 }
      );
    }

    // 注册成功
    return NextResponse.json({
      success: true,
      message: '注册成功',
      user: data.user,
    });
  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}
