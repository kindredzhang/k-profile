import { supabase, Post, PostWithDetails, Category, Tag } from './supabase';

/**
 * 获取所有博客文章
 */
export async function getAllPosts(): Promise<PostWithDetails[]> {
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(*),
      tags:post_tags(tag:tags(*))
    `)
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  // 转换嵌套数据结构
  return posts.map(post => ({
    ...post,
    category: post.category,
    tags: post.tags.map((tagRelation: any) => tagRelation.tag)
  }));
}

/**
 * 按分类获取博客文章
 */
export async function getPostsByCategory(categorySlug: string): Promise<PostWithDetails[]> {
  // 先获取分类ID
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single();

  if (!category) return [];

  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(*),
      tags:post_tags(tag:tags(*))
    `)
    .eq('category_id', category.id)
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return [];
  }

  // 转换嵌套数据结构
  return posts.map(post => ({
    ...post,
    category: post.category,
    tags: post.tags.map((tagRelation: any) => tagRelation.tag)
  }));
}

/**
 * 根据ID获取单篇文章
 */
export async function getPostBySlug(slug: string): Promise<PostWithDetails | null> {
  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(*),
      tags:post_tags(tag:tags(*))
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !post) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }

  // 增加文章浏览次数
  await supabase
    .from('posts')
    .update({ view_count: post.view_count + 1 })
    .eq('id', post.id);

  // 转换嵌套数据结构
  return {
    ...post,
    category: post.category,
    tags: post.tags.map((tagRelation: any) => tagRelation.tag)
  };
}

/**
 * 获取所有分类
 */
export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data;
}

/**
 * 获取所有标签
 */
export async function getAllTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }

  return data;
}

/**
 * 搜索文章
 */
export async function searchPosts(query: string): Promise<PostWithDetails[]> {
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(*),
      tags:post_tags(tag:tags(*))
    `)
    .textSearch('search_vector', query)
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error(`Error searching posts with query "${query}":`, error);
    return [];
  }

  // 转换嵌套数据结构
  return posts.map(post => ({
    ...post,
    category: post.category,
    tags: post.tags.map((tagRelation: any) => tagRelation.tag)
  }));
}
