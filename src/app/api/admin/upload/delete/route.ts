import { withAuthenticatedClient } from '@/lib/db/helpers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
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

    // 使用辅助函数执行删除操作
    const result = await withAuthenticatedClient(async (supabase) => {
      // 删除文件
      const { error } = await supabase.storage
        .from('photos')
        .remove([fileName]);

      if (error) {
        console.error('Error deleting file:', error);
        throw new Error('文件删除失败');
      }

      return { success: true };
    });

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error('Delete API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '服务器错误' },
      { status: 500 }
    );
  }
}
