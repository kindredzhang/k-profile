import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// Re-export client-side auth functions from auth-client.ts
export { getCurrentUser, isLoggedIn, logout } from './auth-client';

/**
 * 管理员登录 - 仅在服务器端使用
 */
export async function loginAdmin(email: string, password: string) {
  try {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      return { user: null, error: error.message };
    }

    return { user: data, error: null };
  } catch (error) {
    console.error('Login error:', error);
    return { user: null, error: '登录过程中发生错误' };
  }
}
