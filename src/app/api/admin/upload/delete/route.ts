import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

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

    // 从签名 URL 中提取文件名
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/');

    // 处理签名 URL，格式为 /storage/v1/object/sign/photos/filename.ext?token=xxx
    let fileName;
    if (pathSegments.includes('sign')) {
      // 如果是签名 URL，文件名应该在 'photos' 之后
      const photosIndex = pathSegments.indexOf('photos');
      if (photosIndex !== -1 && photosIndex < pathSegments.length - 1) {
        fileName = pathSegments[photosIndex + 1];
      }
    } else {
      // 如果是公开 URL，使用原来的方式
      fileName = pathSegments[pathSegments.length - 1];
    }

    if (!fileName) {
      console.error('Could not extract filename from URL:', url);
      return NextResponse.json(
        { error: '无法从 URL 中提取文件名' },
        { status: 400 }
      );
    }

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
