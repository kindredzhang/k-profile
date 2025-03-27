import { formattedDate, readingTime } from '@/lib/utils';
import { ListPost, StarPost, DetailPost } from '@/types';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';


/**
 * get all posts marked as star for display on home page
 */
export async function getStaredPosts(): Promise<StarPost[]> {
  const postsDirectory = path.join(process.cwd(), 'public', 'posts');
  const starredPosts: StarPost[] = [];
  
  // 获取所有目录（分类）
  const categoryDirs = fs.readdirSync(postsDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  // 遍历每个分类目录
  for (const categorySlug of categoryDirs) {
    const categoryPath = path.join(postsDirectory, categorySlug);
    
    // 获取此分类下的所有 Markdown 文件
    const files = fs.readdirSync(categoryPath)
      .filter(filename => filename.endsWith('.md'));
    
    // 处理每一个 Markdown 文件
    for (const filename of files) {
      const filePath = path.join(categoryPath, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      
      // 使用 gray-matter 解析 frontmatter
      const { data } = matter(fileContents);
      
      // 只收集标记为star的文章
      if (data.star === true) {
        // 从文件名获取 slug (移除 .md 扩展名)
        const slug = filename.replace(/\.md$/, '');
        
        // 创建文章对象
        const post: StarPost = {
          id: `${categorySlug}-${slug}`,
          title: data.title || 'Untitled',
          date: formattedDate(data.date || new Date().toISOString()),
          url: `/blog/${categorySlug}/${slug}`
        };
        
        starredPosts.push(post);
      }
    }
  }
  
  return starredPosts;
}

/**
 * get all posts from markdown files for display on blog page
 */
export async function getAllPosts(): Promise<ListPost[]> {
  const postsDirectory = path.join(process.cwd(), 'public', 'posts');
  const allPosts: ListPost[] = [];
  
  // 获取所有目录（分类）
  const categoryDirs = fs.readdirSync(postsDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  // 遍历每个分类目录
  for (const categorySlug of categoryDirs) {
    const categoryPath = path.join(postsDirectory, categorySlug);
    
    // 获取此分类下的所有 Markdown 文件
    const files = fs.readdirSync(categoryPath)
      .filter(filename => filename.endsWith('.md'));
    
    // 处理每一个 Markdown 文件
    for (const filename of files) {
      const filePath = path.join(categoryPath, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      
      // 使用 gray-matter 解析 frontmatter
      const { data, content } = matter(fileContents);

      // 只收集标记为star的文章
      if (data.star === true) {
        // 从文件名获取 slug (移除 .md 扩展名)
        const slug = filename.replace(/\.md$/, '');
        
        // 创建文章对象
        const post: ListPost = {
          id: `${categorySlug}-${slug}`,
          title: data.title || 'Untitled',
          date: formattedDate(data.date || new Date().toISOString()),
          // url: `/blog/${categorySlug}/${slug}`,
          // 展示不对不同的category 区分页面
          url: `/blog/${slug}`,
          reading_time: readingTime(content)
        };
        
        allPosts.push(post);
      }
    }
  }
  
  return allPosts;
}


/**
 * 根据slug获取单篇文章
 */
export async function getPostBySlug(slug: string): Promise<DetailPost | null> {
  const postsDirectory = path.join(process.cwd(), 'public', 'posts');
  
  // 获取所有目录（分类）
  const categoryDirs = fs.readdirSync(postsDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  // 遍历每个分类目录
  for (const categorySlug of categoryDirs) {
    const categoryPath = path.join(postsDirectory, categorySlug);
    
    // 获取此分类下的所有 Markdown 文件
    const files = fs.readdirSync(categoryPath)
      .filter(filename => 
        filename.startsWith(slug) &&
        filename.endsWith('.md')
      );
    
    // 处理每一个 Markdown 文件
    for (const filename of files) {
      const filePath = path.join(categoryPath, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      
      // 使用 gray-matter 解析 frontmatter
      const { data, content } = matter(fileContents);

      // 只收集标记为star的文章
      if (data.star === true) {
        // 从文件名获取 slug (移除 .md 扩展名)
        const slug = filename.replace(/\.md$/, '');
        
        // 创建文章对象
        const post: DetailPost = {
          id: `${categorySlug}-${slug}`,
          title: data.title || 'Untitled',
          date: formattedDate(data.date || new Date().toISOString()),
          content: content,
          view_count: content.length || 0,
          reading_time: readingTime(content)
        };
        
        return post;
      }
    }
  }
  
  return null;
}