// GET route is public, POST route requires authentication
import { withAuthenticatedClient } from '@/lib/db/helpers';
import { addPhoto, getAllPhotos } from '@/lib/db/photos';
import { NextRequest, NextResponse } from 'next/server';

// 获取所有照片
export async function GET(request: NextRequest) {
  try {
    // 使用辅助函数执行数据库操作
    const photos = await withAuthenticatedClient(client => getAllPhotos(client));

    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { error: '获取照片失败' },
      { status: 500 }
    );
  }
}

// 添加新照片
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // 验证必填字段
    if (!data.url) {
      return NextResponse.json(
        { error: '图片URL不能为空' },
        { status: 400 }
      );
    }

    // 使用辅助函数执行数据库操作
    const photo = await withAuthenticatedClient(client =>
      addPhoto({
        title: data.title,
        description: data.description,
        url: data.url,
        file_name: data.file_name,
        category: data.category,
        tags: data.tags,
        is_featured: data.is_featured || false,
      }, client)
    );

    if (!photo) {
      return NextResponse.json(
        { error: '添加照片失败' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      photo
    });
  } catch (error) {
    console.error('Error adding photo:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

