import { supabase } from '../supabase';
import { Tag, PostWithDetails } from '@/types';

/**
 * 获取所有标签
 */
export async function getAllTags(): Promise<Tag[]> {
  const { data: tags, error } = await supabase
    .from('tags')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }

  return tags;
}

/**
 * 根据slug获取标签
 */
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const { data: tag, error } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching tag with slug ${slug}:`, error);
    return null;
  }

  return tag;
}


/**
 * 根据标签获取博客文章
 */
export async function getPostsByTag(tagSlug: string): Promise<PostWithDetails[]> {
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(*),
      tags:post_tags!inner(tag:tags!inner(*))
    `)
    .eq('tags.tag.slug', tagSlug)
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error(`Error fetching posts for tag ${tagSlug}:`, error);
    return [];
  }

  // 转换嵌套数据结构
  return posts.map(post => ({
    ...post,
    category: post.category,
    tags: post.tags.map((tagRelation: any) => tagRelation.tag)
  }));
}
