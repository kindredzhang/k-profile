import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { getAllPosts, getPostBySlug } from './db';
import { PostWithDetails } from './supabase';

// 博客文章存储的目录路径
const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * 获取所有博客文章的元数据，并按日期排序
 */
export async function getSortedPostsData() {
  try {
    // 先尝试从数据库获取文章
    try {
      const dbPosts = await getAllPosts();
      console.log(`Found ${dbPosts.length} posts in database`);
      
      // 如果从数据库获取到了文章，则转换成旧的格式返回
      if (dbPosts && dbPosts.length > 0) {
        return dbPosts.map(post => ({
          id: post.slug,
          title: post.title,
          date: post.published_at || post.created_at,
          description: post.description || ''
        }));
      }
    } catch (dbError) {
      console.error('Error getting posts from database:', dbError);
      // 数据库查询失败，继续使用文件系统
    }
    
    // 还没有从数据库获取到文章，回退到文件系统方式
    // 确保posts目录存在
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
      console.log('Created posts directory:', postsDirectory);
      // 创建目录后如果是空的，直接返回空数组
      return [];
    }
    
    // 获取文件列表（同步方式，避免异步问题）
    let fileNames: string[] = [];
    try {
      fileNames = fs.readdirSync(postsDirectory);
      console.log(`Found ${fileNames.length} files in posts directory`);
    } catch (err) {
      console.error('Error reading posts directory:', err);
      return [];
    }
    
    // 如果没有文件，返回空数组
    if (fileNames.length === 0) {
      console.log('No markdown files found in posts directory');
      return [];
    }
    
    // 处理每个文件，提取元数据
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        try {
          // 从文件名中提取ID（去掉.md后缀）
          const id = fileName.replace(/\.md$/, '');
          const fullPath = path.join(postsDirectory, fileName);
          
          // 同步读取文件内容，避免异步问题
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          
          // 使用gray-matter解析文章元数据
          const matterResult = matter(fileContents);
          
          // 确保必要的元数据存在
          const title = matterResult.data.title || 'Untitled Post';
          const date = matterResult.data.date || new Date().toISOString();
          const description = matterResult.data.description || '';
          
          return {
            id,
            title,
            date,
            description
          };
        } catch (err) {
          console.error(`Error processing markdown file ${fileName}:`, err);
          // 如果出错，继续处理下一个文件
          return null;
        }
      })
      .filter((post): post is { id: string; title: string; date: string; description: string } => post !== null);
    
    console.log(`Successfully processed ${allPostsData.length} posts`);
    
    // 按日期排序（降序）
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error getting sorted posts data:', error);
    return [];
  }
}

/**
 * 根据ID获取单篇文章的内容和元数据
 */
export async function getPostData(id: string) {
  console.log(`Attempting to get post data for ID: ${id}`);
  
  try {
    // 先尝试从数据库获取文章
    try {
      const dbPost = await getPostBySlug(id);
      
      // 如果从数据库获取到了文章，则返回
      if (dbPost) {
        console.log(`Post found in database: ${id}`);
        return {
          id,
          title: dbPost.title,
          date: dbPost.published_at || dbPost.created_at,
          description: dbPost.description || '',
          content: dbPost.content,
        };
      }
    } catch (dbError) {
      console.error(`Error getting post from database for ${id}:`, dbError);
      // 数据库查询失败，继续使用文件系统
    }
    
    // 数据库中没有找到文章，回退到文件系统方式
    const fullPath = path.join(postsDirectory, `${id}.md`);
    console.log(`Attempting to get post from filesystem: ${fullPath}`);
    
    // 检查文件是否存在
    if (!fs.existsSync(fullPath)) {
      console.error(`Post with id ${id} not found at path ${fullPath}`);
      throw new Error(`Post with id ${id} not found at path ${fullPath}`);
    }
    
    // 使用同步读取方式避免异步问题
    let fileContents: string;
    try {
      fileContents = fs.readFileSync(fullPath, 'utf8');
      console.log(`Successfully read file contents for ${id}`);
    } catch (err) {
      console.error(`Error reading file for ${id}:`, err);
      throw err;
    }
    
    // 使用gray-matter解析文章元数据和内容
    let matterResult: matter.GrayMatterFile<string>;
    try {
      matterResult = matter(fileContents);
      console.log(`Successfully parsed frontmatter for ${id}`);
    } catch (err) {
      console.error(`Error parsing frontmatter for ${id}:`, err);
      throw err;
    }
    
    // 确保必要的元数据存在
    const title = matterResult.data.title || 'Untitled Post';
    const date = matterResult.data.date || new Date().toISOString();
    const description = matterResult.data.description || '';
    
    // 返回文件系统中的文章数据
    return {
      id,
      title,
      date,
      description,
      content: matterResult.content,
    };
  } catch (error) {
    console.error(`Error getting post data for ${id}:`, error);
    // 返回一个默认对象，防止应用崩溃
    return {
      id,
      title: 'Post not found',
      date: new Date().toISOString(),
      content: '# Error: Post not found\n\nThe requested post could not be loaded.',
      description: 'The requested post could not be loaded.',
    };
  }
}
