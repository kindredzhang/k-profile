import { supabase } from '@/lib/supabase';
import { Photo } from '@/types';

export type { Photo };

// 模拟照片数据 - 仅在数据库连接失败时使用
const mockPhotos: Photo[] = [
  {
    id: 1,
    title: '水母',
    description: '水族馆中的水母',
    url: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=1000',
    category: '自然',
    tags: ['水族馆', '海洋生物'],
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    title: '咖啡馆',
    description: '城市中的咖啡馆',
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000',
    category: '城市',
    tags: ['咖啡', '城市生活'],
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // 其他模拟数据...
];

/**
 * 获取所有照片
 */
export async function getAllPhotos() {
  try {
    // 尝试从数据库获取照片
    const { data: photos, error } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('photos', photos);
    if (error) {
      console.warn('Error fetching photos from database, using mock data:', error);
      return mockPhotos;
    }

    // 如果数据库没有照片，使用模拟数据
    return photos && photos.length > 0 ? photos : mockPhotos;
  } catch (error) {
    console.warn('Error in getAllPhotos, using mock data:', error);
    return mockPhotos;
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
      return mockPhotos.filter(photo => photo.is_featured);
    }

    return photos;
  } catch (error) {
    console.warn('Error in getFeaturedPhotos, using mock data:', error);
    return mockPhotos.filter(photo => photo.is_featured);
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
