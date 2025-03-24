import ProgressWrapper from '@/components/blog/ProgressWrapper';
import Layout from '@/components/layout/Layout';
import { BookIcon } from '@/components/ui/icons';
import { getAllPosts, getPostBySlug } from '@/lib/db';
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

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

// 博客文章详情页面
export default async function Post({ params }: PageProps) {
  try {
    // 从已解析的参数中获取slug (需要await，因为params可能是Promise)
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    console.log('Fetching post with slug:', slug);
    
    // 安全地从参数中获取文章
    const post = await getPostBySlug(slug);
    console.log('Fetched post:', post);

    // 如果文章不存在则返回404
    if (!post) {
      console.error('Post not found, redirecting to 404 page');
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
        
        <div className="container mx-auto px-4 py-6 md:py-8 relative">
          {/* 背景装饰 */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl"></div>
          </div>
          
          <article className="relative z-10 max-w-3xl mx-auto">
            {/* 返回链接 */}
            <div className="mb-6">
              <Link href="/blog" className="text-sm inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                <BookIcon className="w-4 h-4" />
                <span>返回博客</span>
              </Link>
            </div>
            
            {/* 文章标题 */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 enhance-text">{post.title}</h1>
            
            {/* 元数据 */}
            <div className="flex flex-wrap gap-3 mb-8">
              {/* 发布日期 */}
              <div className="text-sm text-muted-foreground">
                {formattedDate}
              </div>
              
              {/* 分类 */}
              {post.category && (
                <Link 
                  href={`/blog/category/${post.category.slug}`}
                  className="text-sm text-primary/80 hover:text-primary transition-colors"
                >
                  {post.category.name}
                </Link>
              )}
              
              {/* 标签 */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Link 
                      key={tag.id}
                      href={`/blog/tag/${tag.slug}`}
                      className="text-xs inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary/80 hover:bg-primary/20 transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* 文章内容 */}
            <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:enhance-text prose-img:rounded-lg">
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
