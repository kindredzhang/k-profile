import { logEmailSent } from './db/subscribers';
import { Subscriber } from './db/subscribers';

/**
 * 邮件发送配置
 */
type EmailConfig = {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
};

/**
 * 获取邮件配置
 * @returns 邮件配置
 */
function getEmailConfig(): EmailConfig {
  return {
    host: process.env.EMAIL_HOST || '',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASSWORD || '',
    },
  };
}

/**
 * 发送确认订阅邮件
 * @param to 收件人邮箱
 * @param name 收件人姓名（可选）
 * @param token 确认令牌
 * @param customClient 可选的自定义Supabase客户端（用于记录日志）
 * @returns 发送结果
 */
export async function sendConfirmationEmail(
  to: string,
  name: string | undefined,
  token: string,
  customClient?: any
) {
  try {
    // 导入 nodemailer（仅在服务器端）
    const nodemailer = await import('nodemailer');
    
    // 获取邮件配置
    const config = getEmailConfig();
    
    // 创建 transporter
    const transporter = nodemailer.default.createTransport(config);
    
    // 确认链接
    const confirmationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/subscribe/confirm?token=${token}`;
    
    // 邮件主题
    const subject = 'Confirm your subscription to Kindred\'s Newsletter';
    
    // 邮件内容
    const greeting = name ? `Hello ${name},` : 'Hello,';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Confirm Your Subscription</h2>
        <p>${greeting}</p>
        <p>Thank you for subscribing to Kindred's newsletter! To complete your subscription, please click the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${confirmationUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Confirm Subscription</a>
        </div>
        <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
        <p><a href="${confirmationUrl}">${confirmationUrl}</a></p>
        <p>If you didn't request this subscription, you can safely ignore this email.</p>
        <p>Best regards,<br>Kindred</p>
      </div>
    `;
    
    // 发送邮件
    const info = await transporter.sendMail({
      from: `"Kindred" <${config.auth.user}>`,
      to,
      subject,
      html,
    });
    
    // 记录邮件发送
    await logEmailSent(subject, html, to, 'success', undefined, customClient);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    
    // 记录邮件发送失败
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logEmailSent(
      'Confirm your subscription to Kindred\'s Newsletter',
      '',
      to,
      'failed',
      errorMessage,
      customClient
    );
    
    return { success: false, error };
  }
}

/**
 * 发送新内容通知邮件
 * @param to 收件人邮箱
 * @param name 收件人姓名（可选）
 * @param subject 邮件主题
 * @param content 邮件内容
 * @param postUrl 文章链接
 * @param customClient 可选的自定义Supabase客户端（用于记录日志）
 * @returns 发送结果
 */
export async function sendNewContentEmail(
  to: string,
  name: string | undefined,
  subject: string,
  content: string,
  postUrl: string,
  customClient?: any
) {
  try {
    // 导入 nodemailer（仅在服务器端）
    const nodemailer = await import('nodemailer');
    
    // 获取邮件配置
    const config = getEmailConfig();
    
    // 创建 transporter
    const transporter = nodemailer.default.createTransport(config);
    
    // 取消订阅链接
    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/subscribe/unsubscribe?email=${encodeURIComponent(to)}`;
    
    // 邮件主题
    const emailSubject = subject || 'New content from Kindred';
    
    // 邮件内容
    const greeting = name ? `Hello ${name},` : 'Hello,';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">${emailSubject}</h2>
        <p>${greeting}</p>
        <div style="margin: 20px 0;">
          ${content}
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${postUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Read More</a>
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="color: #666; font-size: 12px;">
          You're receiving this email because you subscribed to Kindred's newsletter.
          <br>
          <a href="${unsubscribeUrl}" style="color: #666;">Unsubscribe</a>
        </p>
      </div>
    `;
    
    // 发送邮件
    const info = await transporter.sendMail({
      from: `"Kindred" <${config.auth.user}>`,
      to,
      subject: emailSubject,
      html,
    });
    
    // 记录邮件发送
    await logEmailSent(emailSubject, html, to, 'success', undefined, customClient);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending new content email:', error);
    
    // 记录邮件发送失败
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logEmailSent(
      subject || 'New content from Kindred',
      content,
      to,
      'failed',
      errorMessage,
      customClient
    );
    
    return { success: false, error };
  }
}
