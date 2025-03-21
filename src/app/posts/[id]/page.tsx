import { getPostData, getSortedPostsData } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';

// 生成静态页面参数
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

// 博客文章详情页面
export default function Post({ params }: { params: { id: string } }) {
  const { id } = params;
  const { title, date, content } = getPostData(id);

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <article className="max-w-4xl w-full">
        {/* 文章标题 */}
        <h1>{title}</h1>
        
        {/* 发布日期 */}
        <div className="text-gray-500 mb-8">{date}</div>
        
        {/* 文章内容 - 使用MDXRemote渲染Markdown */}
        <div className="markdown-content">
          <MDXRemote source={content} />
        </div>
      </article>
      
      {/* 返回首页链接 */}
      <div className="mt-8 w-full max-w-4xl">
        <a href="/" className="text-blue-500 hover:underline">← 返回首页</a>
      </div>
    </div>
  );
}
