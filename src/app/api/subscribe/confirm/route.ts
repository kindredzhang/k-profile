import { confirmSubscription } from '@/lib/db/subscribers';
import { withAuthenticatedClient } from '@/lib/db/helpers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 处理确认订阅请求
 */
export async function GET(request: NextRequest) {
  try {
    // 获取确认令牌
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      // 重定向到错误页面
      return NextResponse.redirect(new URL('/subscribe/error?message=无效的确认令牌', request.url));
    }

    // 确认订阅
    const result = await withAuthenticatedClient(client => 
      confirmSubscription(token, client)
    );

    if (!result.success) {
      // 重定向到错误页面
      return NextResponse.redirect(new URL(`/subscribe/error?message=${encodeURIComponent(result.message)}`, request.url));
    }

    // 重定向到成功页面
    return NextResponse.redirect(new URL('/subscribe/success', request.url));
  } catch (error) {
    console.error('Confirm subscription API error:', error);
    // 重定向到错误页面
    return NextResponse.redirect(new URL('/subscribe/error?message=服务器错误', request.url));
  }
}
