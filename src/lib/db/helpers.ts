import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

/**
 * 创建一个带有认证信息的Supabase客户端，并执行数据库操作
 * @param operation 要执行的数据库操作函数
 * @returns 操作结果
 */
export async function withAuthenticatedClient<T>(
  operation: (client: Awaited<ReturnType<typeof createClient>>) => Promise<T>
): Promise<T> {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  return operation(supabase);
}
