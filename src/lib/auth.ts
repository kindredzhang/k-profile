import { User } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { stringToHash } from '../utils';

// Re-export client-side auth functions from auth-client.ts
export { getCurrentUser, isLoggedIn, logout } from './auth-client';

/**
 * 管理员登录 - 仅在服务器端使用
 */
export async function loginAdmin(email: string, password: string) {
  try {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const hash = stringToHash(password);
    // 查询用户
    const { data: users, error: queryError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .limit(1);

    if (queryError) {
      console.error('Error querying user:', queryError);
      return { user: null, error: '登录失败，请稍后再试' };
    }

    if (!users || users.length === 0) {
      return { user: null, error: '用户不存在' };
    } else if (users[0].password !== hash) {
      return { user: null, error: '密码错误' };
    }

    // 登录成功，返回用户信息（不包含密码）
    const user: User = {
      id: users[0].id,
      email: users[0].email,
      created_at: users[0].created_at,
      updated_at: users[0].updated_at
    };

    return { user, error: null };
  } catch (error) {
    console.error('Login error:', error);
    return { user: null, error: '登录过程中发生错误' };
  }
}
