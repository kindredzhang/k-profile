
/**
 * 上传图片到 Supabase Storage
 * @param file 要上传的文件
 * @returns 上传成功返回文件URL，失败返回null
 */
export async function uploadImage(file: File): Promise<string | null> {
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
    return data.url;
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
    // 使用服务器端 API 删除文件
    const response = await fetch('/api/admin/upload/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error deleting image:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteImage:', error);
    return false;
  }
}
