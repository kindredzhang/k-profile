import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

// 博客文章存储的目录路径
const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * 获取所有博客文章的元数据，并按日期排序
 */
export function getSortedPostsData() {
  // 确保posts目录存在
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
  
  // 获取/posts目录下的所有文件名
  const fileNames = fs.readdirSync(postsDirectory);
  
  // 处理每个文件，提取元数据
  const allPostsData = fileNames.map((fileName) => {
    // 从文件名中提取ID（去掉.md后缀）
    const id = fileName.replace(/\.md$/, '');

    // 读取Markdown文件内容
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 使用gray-matter解析文章元数据
    const matterResult = matter(fileContents);

    // 返回包含id和元数据的对象
    return {
      id,
      ...(matterResult.data as { title: string; date: string; description: string }),
    };
  });
  
  // 按日期排序（降序）
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * 根据ID获取单篇文章的内容和元数据
 */
export function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // 使用gray-matter解析文章元数据和内容
  const matterResult = matter(fileContents);

  return {
    id,
    content: matterResult.content,
    ...(matterResult.data as { title: string; date: string; description: string }),
  };
}
