import { User } from '@/types';

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

/**
 * 保存用户信息到会话存储
 */
export function saveUserToSession(user: User) {
  if (typeof window === 'undefined') return;
  
  sessionStorage.setItem('admin_user', JSON.stringify(user));
}
