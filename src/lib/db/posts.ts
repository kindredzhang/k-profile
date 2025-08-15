import { DetailPost, ListPost, StarPost } from '@/types';
import { formattedDate, readingTime } from '@/utils';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';


/**
 * get all posts marked as star for display on home page
 * @deprecated Use getStaredPosts() that returns ListPost[] instead
 */
export async function getStarredPostsForHome(): Promise<StarPost[]> {
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

      // 从文件名获取 slug (移除 .md 扩展名)
      const slug = filename.replace(/\.md$/, '');

      // 创建文章摘要（取前150个字符）
      const excerpt = content.replace(/^#+\s.*$/gm, '').trim().slice(0, 150) + (content.length > 150 ? '...' : '');

      // 创建文章对象
      const post: ListPost = {
        id: `${categorySlug}-${slug}`,
        title: data.title || 'Untitled',
        date: formattedDate(data.date || new Date().toISOString()),
        // url: `/blog/${categorySlug}/${slug}`,
        // 展示不对不同的category 区分页面
        url: `/blog/${slug}`,
        reading_time: readingTime(content),
        excerpt: excerpt,
        tags: data.tags || [],
        category: categorySlug
      };

      allPosts.push(post);
    }
  }

  return allPosts;
}

/**
 * get all posts marked as star for display on blog page
 */
export async function getStaredPosts(): Promise<ListPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => {
    // Extract categorySlug and slug from the post ID
    // post.id format: "categorySlug-slug" where slug might contain hyphens
    const firstHyphenIndex = post.id.indexOf('-');
    const categorySlug = post.id.substring(0, firstHyphenIndex);
    const slug = post.id.substring(firstHyphenIndex + 1);

    // Get the post content to check if it's starred
    const postsDirectory = path.join(process.cwd(), 'public', 'posts');
    const filePath = path.join(postsDirectory, categorySlug, `${slug}.md`);
    
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      // Use gray-matter to parse frontmatter
      const { data } = matter(fileContents);
      // Return only starred posts
      return data.star === true;
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      return false;
    }
  });
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

      // 从文件名获取 slug (移除 .md 扩展名)
      const fileSlug = filename.replace(/\.md$/, '');
      
      // 检查是否匹配请求的slug
      if (fileSlug === slug) {
        // 创建文章对象
        const post: DetailPost = {
          id: `${categorySlug}-${fileSlug}`,
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