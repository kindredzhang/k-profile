import { Category } from '@/types';
import fs from 'fs';
import path from 'path';

/**
 * 获取所有分类
 */
export async function getAllCategories(): Promise<Category[]> {
  try {
    const postsDir = path.join(process.cwd(), 'public', 'posts');
    
    // 读取目录内容
    const items = fs.readdirSync(postsDir, { withFileTypes: true });
    
    // 过滤出文件夹
    const categories = items
      .filter(item => item.isDirectory())
      .map((dir, index) => ({
        id: index + 1,
        name: dir.name.charAt(0).toUpperCase() + dir.name.slice(1),
        slug: dir.name,
        description: null
      }));
    
    return categories;
  } catch (error) {
    console.error('Error fetching categories from filesystem:', error);
    return [];
  }
}
