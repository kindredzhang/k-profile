import { BookIcon } from '@/components/ui/icons';
import { getPostBySlug } from '@/lib/db';
import { formattedDate, readingTime } from '@/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

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
        <div className="container mx-auto px-4 py-4 md:py-6 relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
          </div>
          
          <article className="relative z-10 max-w-2xl mx-auto">
            <header className="mb-6">
              <h1 className="text-xl md:text-3xl font-bold mb-3 leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">{post.title}</h1>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground border-b border-border/30 pb-3">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center gap-1">
                    📅 {formattedDate(post.date)}
                  </span>
                  <span>&middot;</span>
                  <span className="flex items-center gap-1">
                    ⏱️ {readingTime(post.content)}
                  </span>
                  <span>&middot;</span>
                  <span className="flex items-center gap-1">
                    👁️ {post.view_count} 字符
                  </span>
                </div>
              </div>
            </header>
            
            <div className="prose prose-base dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:bg-[#1e1e1e] prose-pre:border prose-pre:border-border/20 prose-headings:text-foreground prose-headings:no-underline prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground prose-h4:text-foreground prose-h5:text-foreground prose-h6:text-foreground">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                  rehypeSlug,
                  rehypeHighlight
                ]}
                components={{
                  code({ className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            <footer className="mt-8 pt-4 border-t border-border/30">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-1 text-sm font-mono text-muted-foreground hover:text-primary transition-colors group bg-muted/20 px-3 py-2 rounded-md hover:bg-muted/30"
              >
                <span className="text-green-500 font-bold">$</span>
                <span className="font-medium underline decoration-muted-foreground/40 decoration-1 underline-offset-2 group-hover:decoration-primary/60">cd ..</span>
              </Link>
            </footer>
          </article>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in Post page component:', error);
    notFound();
  }
}