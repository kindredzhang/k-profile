import { User } from '@/types';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

/**
 * 检查用户是否已登录
 */
export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;

  // 检查 sessionStorage 中是否有用户信息
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
export async function logout() {
  if (typeof window === 'undefined') return;

  // 清除 sessionStorage
  sessionStorage.removeItem('admin_user');

  // 调用 Supabase 的登出方法
  await supabase.auth.signOut();
}

/**
 * 保存用户信息到会话存储
 */
export function saveUserToSession(user: any) {
  if (typeof window === 'undefined') return;

  // 从 Supabase 用户对象中提取需要的信息
  const userData: User = {
    id: user.session.user.id,
    email: user.session.user.email,
    created_at: user.session.user.created_at,
    updated_at: user.session.user.updated_at || user.session.user.created_at
  };

  sessionStorage.setItem('admin_user', JSON.stringify(userData));
}
