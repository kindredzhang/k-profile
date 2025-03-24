import ProgressWrapper from '@/components/blog/ProgressWrapper';
import Layout from '@/components/layout/Layout';
import { BookIcon } from '@/components/ui/icons';
import { getAllPosts, getPostBySlug } from '@/lib/db';
import { formattedDate } from '@/lib/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

// 生成静态页面参数
export async function generateStaticParams() {
  // 从数据库获取所有博客文章
  const posts = await getAllPosts();
  
  // 为每篇文章创建参数对象
  return posts.map(post => ({
    slug: post.slug,
  }));
}

// 博客文章详情页面
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  try {
    // 直接从参数中获取slug
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    // 安全地从参数中获取文章
    const post = await getPostBySlug(slug);

    // 如果文章不存在则返回404
    if (!post) {
      notFound();
    }
    
    return (
      <Layout>
        {/* 阅读进度条 */}
        <ProgressWrapper />
        
        <div className="container mx-auto px-4 py-4 md:py-6 relative">
          {/* 背景装饰 - 更微妙的背景效果 */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
          </div>
          
          <article className="relative z-10 max-w-2xl mx-auto">
            {/* 返回链接 - 更小更精致 */}
            <div className="mb-3">
              <Link href="/blog" className="text-xs inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                <BookIcon className="w-3 h-3" />
                <span>返回博客</span>
              </Link>
            </div>
            
            {/* 文章标题 - 紧凑版本 */}
            <h1 className="text-2xl md:text-3xl font-bold mb-2 enhance-text leading-tight">{post.title}</h1>
            
            {/* 元数据 - 更紧凑的设计 */}
            <div className="flex flex-wrap gap-2 mb-4 text-xs">
              {/* 发布日期 */}
              <div className="text-xs text-muted-foreground">
                {formattedDate(post.published_at || post.created_at)}
              </div>
            
              {/* 标签 */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.map(tag => (
                    <Link 
                      key={tag.id}
                      href={`/blog/tag/${tag.slug}`}
                      className="text-xs inline-flex items-center px-1.5 py-0.5 rounded-full bg-primary/5 text-primary/70 hover:bg-primary/10 transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* 文章内容 - 更小的字体和优化的间距 */}
            <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none
                prose-headings:font-medium prose-headings:enhance-text
                prose-h1:text-xl prose-h1:mt-6 prose-h1:mb-3
                prose-h2:text-lg prose-h2:mt-5 prose-h2:mb-2
                prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2
                prose-h4:text-sm prose-h4:mt-3 prose-h4:mb-1
                prose-p:text-sm prose-p:leading-relaxed prose-p:my-2
                prose-ul:my-2 prose-ol:my-2 prose-li:text-sm
                prose-li:my-1 prose-li:marker:text-primary/50
                prose-img:rounded-lg prose-img:my-3
                prose-a:text-primary/80 hover:prose-a:text-primary
                prose-pre:text-xs prose-pre:p-3 prose-pre:my-2
                prose-pre:bg-black/80 prose-pre:leading-relaxed
                prose-code:text-xs prose-code:bg-primary/10 prose-code:p-0.5 prose-code:rounded
                prose-blockquote:text-sm prose-blockquote:border-primary/30 prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-3 prose-blockquote:rounded-sm
                prose-strong:text-primary/90 prose-hr:border-border/30">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </article>
        </div>
      </Layout>
    );
  } catch (error) {
    console.error('Error in Post page component:', error);
    notFound();
  }
}
