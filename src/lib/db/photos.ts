import { supabase } from '@/lib/supabase';
import { Photo } from '@/types';

export type { Photo };

// 模拟照片数据
const mockPhotos: Photo[] = [
  {
    id: 1,
    title: '水母',
    description: '水族馆中的水母',
    url: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=1000',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    title: '咖啡馆',
    description: '城市中的咖啡馆',
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    title: '夜景',
    description: '城市夜景',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1000',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    title: '小巷',
    description: '老城区的小巷',
    url: 'https://images.unsplash.com/photo-1464082354059-27db6ce50048?q=80&w=1000',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 5,
    title: '咖啡标志',
    description: '墙上的咖啡标志',
    url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 6,
    title: '红色背景',
    description: '红色背景下的人物剪影',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 7,
    title: '办公室',
    description: '现代办公室',
    url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 8,
    title: '老街',
    description: '老街区',
    url: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1000',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 9,
    title: '屋顶',
    description: '城市屋顶',
    url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1000',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 10,
    title: '绿色树林',
    description: '绿色的树林',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 11,
    title: '夜店',
    description: '夜店灯光',
    url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 12,
    title: '街道',
    description: '夜晚的街道',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// 获取所有照片
export async function getAllPhotos() {
  try {
    // 尝试从数据库获取照片
    const { data: photos, error } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false });

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
