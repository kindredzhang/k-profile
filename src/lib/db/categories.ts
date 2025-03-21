import { supabase, Category } from '../supabase';

/**
 * 获取所有分类
 */
export async function getAllCategories(): Promise<Category[]> {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return categories;
}

/**
 * 根据slug获取分类
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data: category, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return null;
  }

  return category;
}

/**
 * 获取包含文章数量的分类列表
 */
export async function getCategoriesWithCount(): Promise<(Category & { post_count: number })[]> {
  const { data, error } = await supabase
    .rpc('get_categories_with_post_count');

  if (error) {
    console.error('Error fetching categories with count:', error);
    return [];
  }

  return data;
}
