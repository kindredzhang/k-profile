import { PostWithDetails, Post, Category, Tag } from '@/types';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * 从文件系统中读取所有 Markdown 文件并解析为博客文章
 */
export async function getAllPosts(): Promise<PostWithDetails[]> {
  const postsDirectory = path.join(process.cwd(), 'public', 'posts');
  const allPosts: PostWithDetails[] = [];
  
  // 获取所有目录（分类）
  const categoryDirs = fs.readdirSync(postsDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  // 遍历每个分类目录
  for (const categorySlug of categoryDirs) {
    const categoryPath = path.join(postsDirectory, categorySlug);
    const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
    
    // 创建分类对象
    const category: Category = {
      id: categoryDirs.indexOf(categorySlug) + 1,
      name: categoryName,
      slug: categorySlug,
      description: null
    };
    
    // 获取此分类下的所有 Markdown 文件
    const files = fs.readdirSync(categoryPath)
      .filter(filename => filename.endsWith('.md'));
    
    // 处理每一个 Markdown 文件
    for (const filename of files) {
      const filePath = path.join(categoryPath, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      
      // 使用 gray-matter 解析 frontmatter
      const { data, content } = matter(fileContents);
      
      // 从文件名获取 slug (移除 .md 扩展名)
      const slug = filename.replace(/\.md$/, '');
      
      // 解析标签
      const postTags: Tag[] = data.tags 
        ? data.tags.map((tag: string, index: number) => ({
            id: index + 1,
            name: tag,
            slug: tag.toLowerCase().replace(/\s+/g, '-')
          }))
        : [];
      
      // 创建文章对象
      const post: PostWithDetails = {
        id: files.indexOf(filename) + 1,
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        author: data.author || 'Anonymous',
        description: data.description || null,
        content,
        view_count: 0,
        category,
        tags: postTags
      };
      
      allPosts.push(post);
    }
  }
  
  // 按日期排序（最新的在前面）
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * 按分类获取博客文章
 */
export async function getPostsByCategory(categorySlug: string): Promise<PostWithDetails[]> {
  const allPosts = await getAllPosts();
  
  // 过滤出属于指定分类的文章
  return allPosts.filter(post => post.category?.slug === categorySlug);
}

/**
 * 根据slug获取单篇文章
 */
export async function getPostBySlug(slug: string): Promise<PostWithDetails | null> {
  try {
    if (!slug) {
      console.error('Invalid slug provided:', slug);
      return null;
    }
    
    const allPosts = await getAllPosts();
    const post = allPosts.find(post => post.slug === slug);
    
    if (!post) {
      console.error(`Post with slug ${slug} not found`);
      return null;
    }
    
    // 这里我们可以添加访问计数的逻辑，如果需要的话
    // 由于现在是基于文件的，我们可以考虑使用一个单独的 JSON 文件来存储访问计数
    
    return post;
  } catch (error) {
    console.error(`Unexpected error fetching post with slug ${slug}:`, error);
    return null;
  }
}


/**
 * 获取最新文章
 */
export async function getLatestPosts(limit: number = 5): Promise<PostWithDetails[]> {
  const allPosts = await getAllPosts();
  
  // 按日期排序并限制数量
  return allPosts.slice(0, limit);
}

/**
 * 获取推荐文章 - 可以在 frontmatter 中添加 featured: true 来标记推荐文章
 */
export async function getFeaturedPosts(): Promise<PostWithDetails[]> {
  const allPosts = await getAllPosts();
  
  // 为了兼容性，如果没有设置 featured 字段，我们可以返回最新的几篇文章
  // 或者如果有设置 featured: true 的文章，则返回这些文章
  const featuredPosts = allPosts.filter(post => (post as any).featured === true);
  if (featuredPosts.length > 0) {
    return featuredPosts;
  }
  
  // 如果没有推荐文章，则返回最新的3篇
  return allPosts.slice(0, 3);
}

/**
 * 按标签获取博客文章
 */
export async function getPostsByTag(tagSlug: string): Promise<PostWithDetails[]> {
  const allPosts = await getAllPosts();
  
  // 过滤出包含指定标签的文章
  return allPosts.filter(post => 
    post.tags.some(tag => tag.slug === tagSlug)
  );
}
