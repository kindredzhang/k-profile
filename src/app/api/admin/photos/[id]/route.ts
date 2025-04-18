import { deletePhoto, getPhotoById, updatePhoto } from '@/lib/db/photos';
import { withAuthenticatedClient } from '@/lib/db/helpers';
import { NextRequest, NextResponse } from 'next/server';

// 获取单张照片
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const photoId = parseInt(id);

    if (isNaN(photoId)) {
      return NextResponse.json(
        { error: '无效的照片ID' },
        { status: 400 }
      );
    }

    // 使用辅助函数执行数据库操作
    const photo = await withAuthenticatedClient(client => getPhotoById(photoId, client));

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

    // 使用辅助函数执行数据库操作
    const photo = await withAuthenticatedClient(client => 
      updatePhoto(photoId, {
        title: data.title,
        description: data.description,
        url: data.url,
        category: data.category,
        tags: data.tags,
        is_featured: data.is_featured,
      }, client)
    );

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
    const { id } = await params;
    const photoId = parseInt(id);

    if (isNaN(photoId)) {
      return NextResponse.json(
        { error: '无效的照片ID' },
        { status: 400 }
      );
    }

    // 使用辅助函数执行数据库操作
    const success = await withAuthenticatedClient(client => deletePhoto(photoId, client));

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
