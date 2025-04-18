import { createClient as createClientBrowser } from '@/utils/supabase/client';
import { v4 as uuidv4 } from 'uuid';

// 在客户端环境下创建 Supabase 客户端
const supabase = typeof window !== 'undefined' ? createClientBrowser() : null;

/**
 * 订阅者类型
 */
export type Subscriber = {
  id: number;
  email: string;
  name?: string;
  confirmed: boolean;
  confirmation_token?: string;
  created_at: string;
  updated_at: string;
};

/**
 * 添加新订阅者
 * @param email 订阅者邮箱
 * @param name 订阅者姓名（可选）
 * @param customClient 可选的自定义Supabase客户端
 * @returns 添加的订阅者信息或null
 */
export async function addSubscriber(
  email: string,
  name?: string,
  customClient?: any
) {
  try {
    // 使用提供的客户端或默认客户端
    if (!customClient && !supabase) {
      throw new Error('No Supabase client available. Please provide a client.');
    }
    const client = customClient || supabase;

    // 生成确认令牌
    const confirmationToken = uuidv4();

    // 添加订阅者
    const { data, error } = await client
      .from('subscribers')
      .insert([
        {
          email,
          name,
          confirmed: false,
          confirmation_token: confirmationToken,
        },
      ])
      .select();

    if (error) {
      // 如果是唯一性约束错误，说明邮箱已存在
      if (error.code === '23505') {
        // 查询现有订阅者
        const { data: existingData, error: queryError } = await client
          .from('subscribers')
          .select('*')
          .eq('email', email)
          .single();

        if (queryError) {
          console.error('Error querying existing subscriber:', queryError);
          return null;
        }

        // 如果已经确认，返回已存在信息
        if (existingData.confirmed) {
          return { ...existingData, alreadyConfirmed: true };
        }

        // 如果未确认，更新确认令牌并返回
        const { data: updatedData, error: updateError } = await client
          .from('subscribers')
          .update({
            confirmation_token: confirmationToken,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingData.id)
          .select();

        if (updateError) {
          console.error('Error updating subscriber:', updateError);
          return null;
        }

        return { ...updatedData[0], alreadyExists: true };
      }

      console.error('Error adding subscriber:', error);
      return null;
    }

    return data[0];
  } catch (error) {
    console.error('Error in addSubscriber:', error);
    return null;
  }
}

/**
 * 确认订阅
 * @param token 确认令牌
 * @param customClient 可选的自定义Supabase客户端
 * @returns 确认结果
 */
export async function confirmSubscription(token: string, customClient?: any) {
  try {
    // 使用提供的客户端或默认客户端
    if (!customClient && !supabase) {
      throw new Error('No Supabase client available. Please provide a client.');
    }
    const client = customClient || supabase;

    // 查找具有指定令牌的订阅者
    const { data: subscriber, error: queryError } = await client
      .from('subscribers')
      .select('*')
      .eq('confirmation_token', token)
      .single();

    if (queryError) {
      console.error('Error finding subscriber with token:', queryError);
      return { success: false, message: 'Invalid confirmation token' };
    }

    // 如果已经确认，返回成功
    if (subscriber.confirmed) {
      return { success: true, message: 'Subscription already confirmed', subscriber };
    }

    // 更新订阅者状态为已确认
    const { data, error } = await client
      .from('subscribers')
      .update({
        confirmed: true,
        confirmation_token: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', subscriber.id)
      .select();

    if (error) {
      console.error('Error confirming subscription:', error);
      return { success: false, message: 'Failed to confirm subscription' };
    }

    return { success: true, message: 'Subscription confirmed successfully', subscriber: data[0] };
  } catch (error) {
    console.error('Error in confirmSubscription:', error);
    return { success: false, message: 'An error occurred during confirmation' };
  }
}

/**
 * 获取所有已确认的订阅者
 * @param customClient 可选的自定义Supabase客户端
 * @returns 订阅者列表
 */
export async function getConfirmedSubscribers(customClient?: any) {
  try {
    // 使用提供的客户端或默认客户端
    if (!customClient && !supabase) {
      throw new Error('No Supabase client available. Please provide a client.');
    }
    const client = customClient || supabase;

    // 获取所有已确认的订阅者
    const { data, error } = await client
      .from('subscribers')
      .select('*')
      .eq('confirmed', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching confirmed subscribers:', error);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error in getConfirmedSubscribers:', error);
    return [];
  }
}

/**
 * 取消订阅
 * @param email 订阅者邮箱
 * @param customClient 可选的自定义Supabase客户端
 * @returns 取消结果
 */
export async function unsubscribe(email: string, customClient?: any) {
  try {
    // 使用提供的客户端或默认客户端
    if (!customClient && !supabase) {
      throw new Error('No Supabase client available. Please provide a client.');
    }
    const client = customClient || supabase;

    // 删除订阅者
    const { error } = await client
      .from('subscribers')
      .delete()
      .eq('email', email);

    if (error) {
      console.error('Error unsubscribing:', error);
      return { success: false, message: 'Failed to unsubscribe' };
    }

    return { success: true, message: 'Successfully unsubscribed' };
  } catch (error) {
    console.error('Error in unsubscribe:', error);
    return { success: false, message: 'An error occurred during unsubscription' };
  }
}

/**
 * 记录邮件发送日志
 * @param subject 邮件主题
 * @param content 邮件内容
 * @param sentTo 收件人
 * @param status 发送状态
 * @param errorMessage 错误信息（如果有）
 * @param customClient 可选的自定义Supabase客户端
 */
export async function logEmailSent(
  subject: string,
  content: string,
  sentTo: string,
  status: 'success' | 'failed',
  errorMessage?: string,
  customClient?: any
) {
  try {
    // 使用提供的客户端或默认客户端
    if (!customClient && !supabase) {
      throw new Error('No Supabase client available. Please provide a client.');
    }
    const client = customClient || supabase;

    // 记录邮件发送
    const { error } = await client.from('email_logs').insert([
      {
        subject,
        content,
        sent_to: sentTo,
        status,
        error_message: errorMessage,
      },
    ]);

    if (error) {
      console.error('Error logging email:', error);
    }
  } catch (error) {
    console.error('Error in logEmailSent:', error);
  }
}
