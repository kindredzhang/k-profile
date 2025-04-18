import { getFileStation } from "@/utils";
import { createClient } from "@/utils/supabase/client";

/**
 * 上传图片到 Supabase Storage
 * @param file 要上传的文件
 * @returns 上传成功返回文件URL，失败返回null
 */
export async function uploadImage(file: File) {
  try {
    // 创建 FormData 对象
    const formData = new FormData();
    formData.append('file', file);

    // 使用服务器端 API 上传文件
    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error uploading image:', errorData);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    return null;
  }
}

/**
 * 从 Supabase Storage 删除图片
 * @param url 图片的公开URL
 * @returns 删除成功返回true，失败返回false
 */
export async function deleteImage(url: string): Promise<boolean> {
  try {
    // // 使用服务器端 API 删除文件
    // // 在客户端使用完整URL，在服务器端使用相对URL
    // let apiUrl;
    // if (typeof window !== 'undefined') {
    //   // 客户端环境
    //   apiUrl = new URL('/api/admin/upload/delete', window.location.origin).toString();
    // } else {
    //   // 服务器端环境
    //   apiUrl = '/api/admin/upload/delete';
    // }

    // const response = await fetch(apiUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ url }),
    // });

    const fileStation = getFileStation(url);
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from('photos')
      .remove(fileStation);

    console.log('remove file from supabse.................');
    console.log('fileStation', fileStation);
    console.log('data', data);
    console.log('error', error);

    if (error != null) {
      console.error('Error deleting image:', error);
      return false;
    }

    if (data === null) {
      console.error('Unexpected response from Supabase storage delete');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteImage:', error);
    return false;
  }
}
