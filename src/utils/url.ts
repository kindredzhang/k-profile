/**
 * 获取站点的基础URL
 * 优先使用NEXT_PUBLIC_SITE_URL环境变量
 * 如果不存在，则尝试使用VERCEL_URL环境变量
 * 如果都不存在，则使用localhost:3000作为默认值
 * 
 * @returns 站点的基础URL
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 
         (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
}
