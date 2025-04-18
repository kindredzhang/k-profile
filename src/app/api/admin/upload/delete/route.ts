import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // 检查用户是否已登录
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin_session');
    
    if (!adminSession || !adminSession.value) {
      return NextResponse.json(
        { error: '未授权，请先登录' },
        { status: 401 }
      );
    }
    
    // 使用服务器端 Supabase 客户端
    const supabase = await createClient(cookieStore);
    
    // 获取请求体中的 URL
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: '未提供文件 URL' },
        { status: 400 }
      );
    }
    
    // 从 URL 中提取文件名
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/');
    const fileName = pathSegments[pathSegments.length - 1];
    
    // 删除文件
    const { error } = await supabase.storage
      .from('photos')
      .remove([fileName]);
    
    if (error) {
      console.error('Error deleting file:', error);
      return NextResponse.json(
        { error: '文件删除失败' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error('Delete API error:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}
