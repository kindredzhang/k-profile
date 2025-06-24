import ReadingProgress from '@/components/blog/ReadingProgress';
// import Layout from '@/components/layout/Layout';
import { BookIcon } from '@/components/ui/icons';
import { getPostBySlug } from '@/lib/db';
import { formattedDate, readingTime } from '@/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

// 博客文章详情页面
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const post = await getPostBySlug(slug!);
    if (!post) {
      notFound();
    }
    
    return (
      <div>
        {/* 计算阅读进度 控制是否出现置顶标识 */}
        <ReadingProgress />
        
        <div className="container mx-auto px-4 py-4 md:py-10 relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
          </div>
          
          <article className="relative z-10 max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 leading-tight">{post.title}</h1>
            
            <div className="flex items-center space-x-2 mb-8 text-sm text-muted-foreground">
              <span>{formattedDate(post.date)}</span>
              <span>&middot;</span>
              <span>{readingTime(post.content)}</span>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            <div className="mt-8 mb-4">
              <Link href="/blog" className="text-sm inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                <BookIcon className="w-4 h-4" />
                <span>cd ..</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in Post page component:', error);
    notFound();
  }
}