import { supabase } from './supabase';
import { User } from '@/types';
import { stringToHash } from './utils';


/**
 * 管理员登录
 */
export async function loginAdmin(email: string, password: string) {
  try {
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

    // 在会话中存储用户信息
    sessionStorage.setItem('admin_user', JSON.stringify(user));

    return { user, error: null };
  } catch (error) {
    console.error('Login error:', error);
    return { user: null, error: '登录过程中发生错误' };
  }
}

/**
 * 检查用户是否已登录
 */
export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userStr = sessionStorage.getItem('admin_user');
  return !!userStr;
}

/**
 * 获取当前登录用户
 */
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  const userStr = sessionStorage.getItem('admin_user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr) as User;
  } catch (error) {
    console.error('Error parsing user from session:', error);
    return null;
  }
}

/**
 * 退出登录
 */
export function logout() {
  if (typeof window === 'undefined') return;
  
  sessionStorage.removeItem('admin_user');
}
