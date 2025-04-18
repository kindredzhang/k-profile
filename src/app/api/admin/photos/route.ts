// GET route is public, POST route requires authentication
import { addPhoto, getAllPhotos } from '@/lib/db/photos';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// 获取所有照片
export async function GET(request: NextRequest) {
  try {
    // 创建 Supabase 客户端
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    // 获取所有照片
    const photos = await getAllPhotos(supabase);

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
    // 检查用户是否已登录
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    // 获取当前用户会话
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: '未授权，请先登录' },
        { status: 401 }
      );
    }

    const data = await request.json();

    // 验证必填字段
    if (!data.url) {
      return NextResponse.json(
        { error: '图片URL不能为空' },
        { status: 400 }
      );
    }

    // 添加照片 - 传递带有认证信息的 Supabase 客户端
    const photo = await addPhoto({
      title: data.title,
      description: data.description,
      url: data.url,
      file_name: data.file_name,
      category: data.category,
      tags: data.tags,
      is_featured: data.is_featured || false,
    }, supabase);

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

