import { addSubscriber } from '@/lib/db/subscribers';
import { sendConfirmationEmail } from '@/lib/email';
import { withAuthenticatedClient } from '@/lib/db/helpers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 处理订阅请求
 */
export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const { email, name } = await request.json();

    // 验证邮箱
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 添加订阅者
    const subscriber = await withAuthenticatedClient(client => 
      addSubscriber(email, name, client)
    );

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Subscription failed, please try again later.' },
        { status: 500 }
      );
    }

    // 如果已经确认，返回成功消息
    if (subscriber.alreadyConfirmed) {
      return NextResponse.json({
        success: true,
        message: 'Success',
        alreadyConfirmed: true,
      });
    }

    // 如果已经存在但未确认，发送确认邮件
    if (subscriber.alreadyExists) {
      await withAuthenticatedClient(client => 
        sendConfirmationEmail(email, name, subscriber.confirmation_token, client)
      );

      return NextResponse.json({
        success: true,
        message: 'A confirmation email has been sent, please check your inbox.',
        alreadyExists: true,
      });
    }

    // 发送确认邮件
    await withAuthenticatedClient(client => 
      sendConfirmationEmail(email, name, subscriber.confirmation_token, client)
    );

    return NextResponse.json({
      success: true,
      message: 'Thank you for your subscription! Please check your email and click the confirmation link to complete the subscription.',
    });
  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { error: 'Error......' },
      { status: 500 }
    );
  }
}
