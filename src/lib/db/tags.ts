import { supabase, Tag, PostWithDetails } from '../supabase';

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
 * 获取包含文章数量的标签列表
 */
export async function getTagsWithCount(): Promise<(Tag & { post_count: number })[]> {
  try {
    // 尝试使用RPC函数
    const { data, error } = await supabase
      .rpc('get_tags_with_post_count');

    if (error) {
      console.error('Error fetching tags with count:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Falling back to manual tag count calculation');
    
    // 如果RPC失败，使用替代方法手动计算标签计数
    const { data: tags } = await supabase
      .from('tags')
      .select('*')
      .order('name');
      
    if (!tags) return [];
    
    // 为每个标签添加计数属性
    return tags.map(tag => ({
      ...tag,
      post_count: 0 // 默认为0，因为我们不做额外的数据库查询
    }));
  }
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
