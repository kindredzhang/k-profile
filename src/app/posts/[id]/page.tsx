import Layout from '@/components/layout/Layout';
import { BookIcon } from '@/components/ui/icons';
import { getAllPosts, getPostBySlug } from '@/lib/db';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProgressWrapper from '@/components/blog/ProgressWrapper';

// 生成静态页面参数
export async function generateStaticParams() {
  // 从数据库获取所有博客文章
  const posts = await getAllPosts();
  
  // 为每篇文章创建参数对象
  return posts.map(post => ({
    id: post.slug,
  }));
}

// 博客文章详情页面
export default async function Post({ params }: { params: { id: string } }) {
  try {
    // 安全地从参数中获取ID
    const post = await getPostBySlug(params.id);
  
    // 如果文章不存在则返回404
    if (!post) {
      notFound();
    }
  
    // 格式化日期
    const formattedDate = new Date(post.published_at || post.created_at).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return (
      <Layout>
        {/* 阅读进度条 */}
        <ProgressWrapper />
      
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
              <div className="mb-6 flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <BookIcon width="24" height="24" className="text-primary" />
                  <time dateTime={post.published_at || post.created_at} className="text-sm text-primary/80 font-medium">
                    {formattedDate}
                  </time>
                </div>
                
                {post.category && (
                  <div className="flex items-center gap-2">
                    <span className="text-primary/30">•</span>
                    <span className="text-sm text-primary/80 font-medium">{post.category.name}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <span className="text-primary/30">•</span>
                  <span className="flex items-center gap-1 text-sm text-primary/80 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {Math.ceil(post.content.length / 1000)} min
                  </span>
                </div>
                
                {post.view_count > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-primary/30">•</span>
                    <span className="flex items-center gap-1 text-sm text-primary/80 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      {post.view_count} 次浏览
                    </span>
                  </div>
                )}
              </div>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map(tag => (
                    <span key={tag.id} className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}
            
              <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-8 enhance-text">{post.title}</h1>
              
              {post.description && (
                <p className="text-xl text-muted-foreground mb-8 font-serif italic">{post.description}</p>
              )}
              
              <div className="prose prose-lg prose-invert max-w-none">
                <MDXRemote source={post.content} />
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
  } catch (error) {
    console.error('Error rendering post:', error);
    notFound();
  }
}
