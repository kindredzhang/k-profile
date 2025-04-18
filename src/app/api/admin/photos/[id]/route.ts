import { deletePhoto, getPhotoById, updatePhoto } from '@/lib/db/photos';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// 获取单张照片
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 创建 Supabase 客户端
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    const { id } = await params;
    const photoId = parseInt(id);

    if (isNaN(photoId)) {
      return NextResponse.json(
        { error: '无效的照片ID' },
        { status: 400 }
      );
    }

    const photo = await getPhotoById(photoId, supabase);

    if (!photo) {
      return NextResponse.json(
        { error: '照片不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({ photo });
  } catch (error) {
    console.error(`Error fetching photo:`, error);
    return NextResponse.json(
      { error: '获取照片失败' },
      { status: 500 }
    );
  }
}

// 更新照片
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const photoId = parseInt(id);

    if (isNaN(photoId)) {
      return NextResponse.json(
        { error: '无效的照片ID' },
        { status: 400 }
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

    // 更新照片 - 传递带有认证信息的 Supabase 客户端
    const photo = await updatePhoto(photoId, {
      title: data.title,
      description: data.description,
      url: data.url,
      category: data.category,
      tags: data.tags,
      is_featured: data.is_featured,
    }, supabase);

    if (!photo) {
      return NextResponse.json(
        { error: '更新照片失败' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      photo
    });
  } catch (error) {
    console.error(`Error updating photo:`, error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

// 删除照片
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const photoId = parseInt(id);

    if (isNaN(photoId)) {
      return NextResponse.json(
        { error: '无效的照片ID' },
        { status: 400 }
      );
    }

    // 删除照片 - 传递带有认证信息的 Supabase 客户端
    const success = await deletePhoto(photoId, supabase);

    if (!success) {
      return NextResponse.json(
        { error: '删除照片失败' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error(`Error deleting photo:`, error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}
