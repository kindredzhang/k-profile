import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

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

    // 解析 multipart/form-data 请求
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: '未提供文件' },
        { status: 400 }
      );
    }

    // 生成唯一文件名
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;

    // 将文件转换为 ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);

    // 上传文件到 Supabase Storage
    const { error } = await supabase.storage
      .from('photos')
      .upload(fileName, fileBuffer, {
        contentType: file.type,
      });

    if (error) {
      console.error('Error uploading file:', error);
      return NextResponse.json(
        { error: '文件上传失败' },
        { status: 500 }
      );
    }

    // 获取签名URL，有效期10年（315360000秒）
    const { data: urlData, error: signedUrlError } = await supabase.storage
      .from('photos')
      .createSignedUrl(fileName, 315360000);

    if (signedUrlError) {
      console.error('Error creating signed URL:', signedUrlError);
      return NextResponse.json(
        { error: '获取签名URL失败' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: urlData.signedUrl,
      name: fileName,
    });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

// 设置较大的请求体大小限制（默认为 4MB）
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
