import { deleteImage } from '@/lib/storage';
import { Photo } from '@/types';
import { createClient as createClientBrowser } from '@/utils/supabase/client';

export type { Photo };

/**
 * 获取所有照片
 * @param customClient 可选的自定义Supabase客户端
 */
// 在客户端环境下创建 Supabase 客户端
const supabase = typeof window !== 'undefined' ? createClientBrowser() : null;
export async function getAllPhotos(customClient?: any) {
  try {
    // 使用提供的客户端或默认客户端
    if (!customClient && !supabase) {
      throw new Error('No Supabase client available. Please provide a client.');
    }
    const client = customClient || supabase;

    // 尝试从数据库获取照片
    const { data: photos, error } = await client
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching photos from database:', error);
      return [];
    }

    return photos;
  } catch (error) {
    console.warn('Error in getAllPhotos:', error);
    return [];
  }
}

/**
 * 获取精选照片
 * @param customClient 可选的自定义Supabase客户端
 */
export async function getFeaturedPhotos(customClient?: any) {
  try {
    // 使用提供的客户端或默认客户端
    if (!customClient && !supabase) {
      throw new Error('No Supabase client available. Please provide a client.');
    }
    const client = customClient || supabase;

    const { data: photos, error } = await client
      .from('photos')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching featured photos from database:', error);
      return [];
    }

    return photos;
  } catch (error) {
    console.warn('Error in getFeaturedPhotos:', error);
    return [];
  }
}

/**
 * 根据ID获取单张照片
 * @param id 照片ID
 * @param customClient 可选的自定义Supabase客户端
 */
export async function getPhotoById(id: number, customClient?: any) {
  try {
    // 使用提供的客户端或默认客户端
    if (!customClient && !supabase) {
      throw new Error('No Supabase client available. Please provide a client.');
    }
    const client = customClient || supabase;

    const { data: photo, error } = await client
      .from('photos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.warn(`Error fetching photo with id ${id}:`, error);
      return null;
    }

    return photo;
  } catch (error) {
    console.warn(`Error in getPhotoById for id ${id}:`, error);
    return null;
  }
}

/**
 * 根据分类获取照片
 * @param category 分类名称
 * @param customClient 可选的自定义Supabase客户端
 */
export async function getPhotosByCategory(category: string, customClient?: any) {
  try {
    // 使用提供的客户端或默认客户端
    if (!customClient && !supabase) {
      throw new Error('No Supabase client available. Please provide a client.');
    }
    const client = customClient || supabase;

    const { data: photos, error } = await client
      .from('photos')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn(`Error fetching photos for category ${category}:`, error);
      return [];
    }

    return photos;
  } catch (error) {
    console.warn(`Error in getPhotosByCategory for ${category}:`, error);
    return [];
  }
}

/**
 * 添加新照片
 * @param photo 照片数据
 * @param customClient 可选的自定义Supabase客户端，用于传递认证信息
 */
export async function addPhoto(photo: Omit<Photo, 'id' | 'created_at' | 'updated_at'>, customClient?: any) {
  try {
    // 使用提供的客户端或默认客户端
    if (!customClient && !supabase) {
      throw new Error('No Supabase client available. Please provide a client.');
    }
    const client = customClient || supabase;

    const { data, error } = await client
      .from('photos')
      .insert([photo])
      .select();

    if (error) {
      console.error('Error adding photo:', error);
      return null;
    }

    return data[0];
  } catch (error) {
    console.error('Error in addPhoto:', error);
    return null;
  }
}

/**
 * 更新照片信息
 * @param id 照片ID
 * @param updates 更新的数据
 * @param customClient 可选的自定义Supabase客户端，用于传递认证信息
 */
export async function updatePhoto(id: number, updates: Partial<Omit<Photo, 'id' | 'created_at' | 'updated_at'>>, customClient?: any) {
  try {
    // 使用提供的客户端或默认客户端
    if (!customClient && !supabase) {
      throw new Error('No Supabase client available. Please provide a client.');
    }
    const client = customClient || supabase;

    const { data, error } = await client
      .from('photos')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) {
      console.error(`Error updating photo with id ${id}:`, error);
      return null;
    }

    return data[0];
  } catch (error) {
    console.error(`Error in updatePhoto for id ${id}:`, error);
    return null;
  }
}

/**
 * 删除照片
 * @param id 照片ID
 * @param customClient 可选的自定义Supabase客户端，用于传递认证信息
 */
export async function deletePhoto(id: number, customClient?: any) {
  try {
    // 使用提供的客户端或默认客户端
    if (!customClient && !supabase) {
      throw new Error('No Supabase client available. Please provide a client.');
    }
    const client = customClient || supabase;

    // 先获取照片信息，以便删除存储中的文件
    const photo = await getPhotoById(id, client);

    if (photo && photo.url) {
      // 检查URL是否来自Supabase Storage
      if (photo.url.includes('supabase.co') || photo.url.includes('storage/v1/object')) {
        // 尝试删除存储中的文件
        const success = await deleteImage(photo.url);
        if (!success) {
          console.warn(`Failed to delete image from storage: ${photo.url}`);
          // 继续删除数据库记录，即使存储删除失败
        }
      }
    }

    // 删除数据库中的记录
    const { error } = await client
      .from('photos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting photo with id ${id}:`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error in deletePhoto for id ${id}:`, error);
    return false;
  }
}
