import { withAuthenticatedClient } from '@/lib/db/helpers';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
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

    // 使用辅助函数执行上传操作
    const result = await withAuthenticatedClient(async (supabase) => {
      // 上传文件到 Supabase Storage
      const { error } = await supabase.storage
        .from('photos')
        .upload(fileName, fileBuffer, {
          contentType: file.type,
        });

      if (error) {
        console.error('Error uploading file:', error);
        throw new Error('文件上传失败');
      }

      // 获取签名URL，有效期10年（315360000秒）
      const { data: urlData, error: signedUrlError } = await supabase.storage
        .from('photos')
        .createSignedUrl(fileName, 315360000);

      if (signedUrlError) {
        console.error('Error creating signed URL:', signedUrlError);
        throw new Error('获取签名URL失败');
      }

      return {
        url: urlData.signedUrl,
        name: fileName,
      };
    });

    return NextResponse.json({
      success: true,
      url: result.url,
      name: result.name,
    });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '服务器错误' },
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
