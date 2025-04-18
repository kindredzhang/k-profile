import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

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
    const { data, error } = await supabase.storage
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
    
    // 获取公开访问 URL
    const { data: urlData } = supabase.storage
      .from('photos')
      .getPublicUrl(fileName);
    
    return NextResponse.json({
      success: true,
      url: urlData.publicUrl
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
