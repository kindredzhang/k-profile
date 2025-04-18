import { getConfirmedSubscribers } from '@/lib/db/subscribers';
import { sendNewContentEmail } from '@/lib/email';
import { withAuthenticatedClient } from '@/lib/db/helpers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 处理发送通知请求
 * 
 * 请求体格式：
 * {
 *   subject: string;    // 邮件主题
 *   content: string;    // 邮件内容（HTML格式）
 *   postUrl: string;    // 文章链接
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // 检查用户是否已登录（中间件已处理认证）
    
    // 解析请求体
    const { subject, content, postUrl } = await request.json();

    // 验证必填字段
    if (!subject || !content || !postUrl) {
      return NextResponse.json(
        { error: '主题、内容和文章链接不能为空' },
        { status: 400 }
      );
    }

    // 获取所有已确认的订阅者
    const subscribers = await withAuthenticatedClient(client => 
      getConfirmedSubscribers(client)
    );

    if (subscribers.length === 0) {
      return NextResponse.json({
        success: false,
        message: '没有已确认的订阅者',
      });
    }

    // 发送通知邮件
    const results = await Promise.allSettled(
      subscribers.map((subscriber: any) => 
        withAuthenticatedClient(client => 
          sendNewContentEmail(
            subscriber.email,
            subscriber.name,
            subject,
            content,
            postUrl,
            client
          )
        )
      )
    );

    // 统计发送结果
    const succeeded = results.filter(r => r.status === 'fulfilled' && (r.value as any).success).length;
    const failed = results.length - succeeded;

    return NextResponse.json({
      success: true,
      message: `成功发送 ${succeeded} 封邮件，失败 ${failed} 封`,
      total: subscribers.length,
      succeeded,
      failed,
    });
  } catch (error) {
    console.error('Notify API error:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

/**
 * 使用示例：
 * 
 * 当你发布新博客后，可以调用此API发送通知：
 * 
 * ```javascript
 * // 假设你有一个新博客文章
 * const newPost = {
 *   title: '我的新博客文章',
 *   excerpt: '这是一篇关于...',
 *   url: '/blog/my-new-post'
 * };
 * 
 * // 构建邮件内容
 * const emailContent = `
 *   <h3>我刚刚发布了一篇新文章</h3>
 *   <p>${newPost.excerpt}</p>
 *   <p>点击下方按钮阅读全文</p>
 * `;
 * 
 * // 发送通知
 * const response = await fetch('/api/admin/notify', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *   },
 *   body: JSON.stringify({
 *     subject: `新文章: ${newPost.title}`,
 *     content: emailContent,
 *     postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}${newPost.url}`,
 *   }),
 * });
 * 
 * const result = await response.json();
 * console.log('通知发送结果:', result);
 * ```
 */
