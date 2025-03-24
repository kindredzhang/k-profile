import BlogLayout from '@/components/blog/BlogLayout';
import { BookIcon } from '@/components/ui/icons';
import { getAllCategories } from '@/lib/db/categories';
import { getAllPosts } from '@/lib/db/posts';
import { ListPost } from '@/types';
import Link from 'next/link';

export default async function BlogPage() {
  // 从数据库获取文章、分类和标签
  const posts: ListPost[] = await getAllPosts();
  const categories = await getAllCategories();
  
  // 按年份分组文章
  const postsByYear = posts.reduce((acc: Record<string, ListPost[]>, post) => {
    // 使用date字段获取年份
    const date = post.date;
    const year = new Date(date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<string, ListPost[]>);

  // 获取所有年份并排序
  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <BlogLayout categories={categories} activeCategory="blog">
      {posts.length > 0 ? (
        <div>
          {/* 按年份分组的文章列表 */}
          {years.map((year) => (
            <div key={year} className="mb-8">
              {/* 年份标题 - 简化版 */}
              <div className="relative mb-3">
                <h2 className="text-3xl font-bold opacity-20 enhance-text">{year}</h2>
                <div className="absolute bottom-0 left-0 w-full border-b border-border/30"></div>
              </div>
              
              {/* 该年份的文章 - 简化列表 */}
              <div className="space-y-1.5">
                {postsByYear[year].map((post) => (
                  <article key={post.id} className="group transition-all duration-300">
                    <Link 
                      href={post.url}
                      className="block py-2 border-b border-border/20 hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between gap-3 px-1.5">
                        <div className="flex-1">
                          <h2 className="text-sm font-medium opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-300">
                            {post.title}
                          </h2>
                        </div>
                        <time dateTime={post.date} className="text-xs text-muted-foreground whitespace-nowrap">
                          {post.date}
                        </time>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {post.reading_time}
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-card/30 p-5 rounded-lg border border-border/30">
          <BookIcon width="24" height="24" className="text-primary/40 mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">暂无博客文章</p>
        </div>
      )}
    </BlogLayout>
  );
}
