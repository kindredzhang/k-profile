import ProgressWrapper from '@/components/blog/ProgressWrapper';
import Layout from '@/components/layout/Layout';
import { BookIcon } from '@/components/ui/icons';
import { getPostBySlug } from '@/lib/db';
import { formattedDate, readingTime } from '@/lib/utils';
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
      <Layout>
        <ProgressWrapper />
        
        <div className="container mx-auto px-4 py-4 md:py-10 relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
          </div>
          
          <article className="relative z-10 max-w-2xl mx-auto">

            <h1 className="text-xl md:text-3xl font-bold mb-2 enhance-text leading-tight">{post.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4 text-xs">
              <div className="text-xs text-muted-foreground opacity-75">
                {formattedDate(post.date)} | {readingTime(post.content)}
              </div>
            </div>
            
            <div className="prose dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:enhance-text
                prose-h1:text-xl prose-h1:mt-8 prose-h1:mb-4
                prose-h2:text-lg prose-h2:mt-7 prose-h2:mb-3
                prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
                prose-h4:text-base prose-h4:mt-4 prose-h4:mb-1
                prose-p:text-sm prose-p:leading-relaxed prose-p:my-3
                prose-ul:my-3 prose-ol:my-3 prose-li:text-sm
                prose-li:my-1 prose-li:marker:text-primary/70
                prose-img:rounded-lg prose-img:my-4
                prose-a:text-primary hover:prose-a:text-primary/80 hover:prose-a:underline
                prose-pre:text-sm prose-pre:p-4 prose-pre:my-3
                prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-900/60 prose-pre:leading-relaxed
                prose-code:text-sm prose-code:bg-primary/10 prose-code:p-0.5 prose-code:rounded
                prose-blockquote:text-sm prose-blockquote:border-l-4 prose-blockquote:border-primary/40 
                prose-blockquote:bg-zinc-100 dark:prose-blockquote:bg-zinc-800/30 
                prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r
                prose-strong:font-bold prose-strong:text-primary/90 prose-hr:border-zinc-200 dark:prose-hr:border-zinc-700">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            <div className="mb-3">
              <Link href="/blog" className="text-xs inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                <BookIcon className="w-3 h-3" />
                <span>cd ..</span>
              </Link>
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
