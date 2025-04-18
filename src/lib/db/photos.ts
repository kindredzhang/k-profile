import { deleteImage } from '@/lib/storage';
import { Photo } from '@/types';
import { createClient } from '@/utils/supabase/client';

export type { Photo };

/**
 * 获取所有照片
 */
const supabase = createClient();
export async function getAllPhotos() {
  try {
    // 尝试从数据库获取照片
    const { data: photos, error } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('photos', photos);
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
 */
export async function getFeaturedPhotos() {
  try {
    const { data: photos, error } = await supabase
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
    console.warn('Error in getFeaturedPhotos, using mock data:', error);
    return [];
  }
}

/**
 * 根据ID获取单张照片
 */
export async function getPhotoById(id: number) {
  try {
    const { data: photo, error } = await supabase
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
 */
export async function getPhotosByCategory(category: string) {
  try {
    const { data: photos, error } = await supabase
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
 */
export async function addPhoto(photo: Omit<Photo, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
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
 */
export async function updatePhoto(id: number, updates: Partial<Omit<Photo, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    const { data, error } = await supabase
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
 */
export async function deletePhoto(id: number) {
  try {
    // 先获取照片信息，以便删除存储中的文件
    const photo = await getPhotoById(id);

    if (photo && photo.url) {
      // 检查URL是否来自Supabase Storage
      if (photo.url.includes('storage.googleapis.com') || photo.url.includes('supabase')) {
        // 尝试删除存储中的文件
        await deleteImage(photo.url);
      }
    }

    // 删除数据库中的记录
    const { error } = await supabase
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
