import { stringToHash } from '@/utils';
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

    // 检查邮箱是否已存在
    const { data: existingUsers, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .limit(1);

    if (checkError) {
      console.error('Error checking existing user:', checkError);
      return NextResponse.json(
        { error: '注册失败，请稍后再试' },
        { status: 500 }
      );
    }

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 400 }
      );
    }

    // 对密码进行哈希处理
    const hashedPassword = stringToHash(password);

    // 插入新用户
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          email,
          password: hashedPassword,
        },
      ])
      .select();

    if (insertError) {
      console.error('Error inserting new user:', insertError);
      return NextResponse.json(
        { error: '注册失败，请稍后再试' },
        { status: 500 }
      );
    }

    // 注册成功
    return NextResponse.json({
      success: true,
      message: '注册成功',
      user: {
        id: newUser[0].id,
        email: newUser[0].email,
        created_at: newUser[0].created_at,
      },
    });
  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}
