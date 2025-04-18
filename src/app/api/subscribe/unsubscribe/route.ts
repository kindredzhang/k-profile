import { unsubscribe } from '@/lib/db/subscribers';
import { withAuthenticatedClient } from '@/lib/db/helpers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 处理取消订阅请求
 */
export async function GET(request: NextRequest) {
  try {
    // 获取邮箱
    const email = request.nextUrl.searchParams.get('email');

    if (!email) {
      // 重定向到错误页面
      return NextResponse.redirect(new URL('/subscribe/error?message=无效的邮箱地址', request.url));
    }

    // 取消订阅
    const result = await withAuthenticatedClient(client => 
      unsubscribe(email, client)
    );

    if (!result.success) {
      // 重定向到错误页面
      return NextResponse.redirect(new URL(`/subscribe/error?message=${encodeURIComponent(result.message)}`, request.url));
    }

    // 重定向到取消订阅成功页面
    return NextResponse.redirect(new URL('/subscribe/unsubscribed', request.url));
  } catch (error) {
    console.error('Unsubscribe API error:', error);
    // 重定向到错误页面
    return NextResponse.redirect(new URL('/subscribe/error?message=服务器错误', request.url));
  }
}
