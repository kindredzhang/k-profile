import { getPostData, getSortedPostsData } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { BookIcon } from '@/components/ui/icons';
import ClientReadingProgress from '@/components/blog/ClientReadingProgress';

// 生成静态页面参数
export async function generateStaticParams() {
  // 获取所有博客文章
  const posts = await getSortedPostsData();
  
  // 为每篇文章创建参数对象
  return posts.map((post: { id: string; title: string; date: string; description?: string }) => ({
    id: post.id,
  }));
}

// 博客文章详情页面
export default async function Post({ params }: { params: { id: string } }) {
  // 使用异步处理参数
  const id = params.id;
  // await 等待异步函数结果
  const { title, date, content } = await getPostData(id);
  
  const formattedDate = new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Layout>
      {/* 阅读进度条 */}
      <ClientReadingProgress />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-primary hover:underline mb-6 gap-2 transition-all duration-300 hover:translate-x-[-4px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            返回博客列表
          </Link>
          
          <article className="enhanced-card bg-card/80 backdrop-blur-sm p-8 rounded-lg border border-border">
            <div className="mb-6 flex items-center gap-2">
              <BookIcon width="24" height="24" className="text-primary" />
              <time dateTime={date} className="text-sm text-primary/80 font-medium">
                {formattedDate}
              </time>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-8 enhance-text">{title}</h1>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <MDXRemote source={content} />
            </div>
          </article>
          
          <div className="mt-12 text-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center justify-center rounded-md gradient-btn px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm gap-2"
            >
              <BookIcon width="18" height="18" />
              查看更多文章
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
