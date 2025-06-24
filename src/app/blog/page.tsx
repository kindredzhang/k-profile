import { BookIcon } from '@/components/ui/icons';
import { getAllCategories } from '@/lib/db/categories';
import { getAllPosts } from '@/lib/db/posts';
import { Category, ListPost } from '@/types';
import Link from 'next/link';

export default async function BlogPage() {
  // 从数据库获取文章、分类和标签
  const posts: ListPost[] = await getAllPosts();
  const categories: Category[] = await getAllCategories();
  
  // 按年份分组文章
  const postsByYear = posts.reduce((acc: Record<string, ListPost[]>, post) => {
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
    <div className="container mx-auto px-4 py-4 md:py-6 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="flex items-center mb-3 border-b border-border pb-2">
          <div className="flex gap-3 md:gap-5 overflow-x-auto">
            {categories.map((category: Category) => (
              <Link 
                key={category.id}
                href={`/${category.slug}`}
                className="text-base md:text-lg font-medium pb-1.5 border-b-2 px-1 transition-all duration-300 border-transparent hover:border-primary/40 text-muted-foreground hover:text-primary/80 opacity-40 hover:opacity-90"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

      {posts.length > 0 ? (
        <div>
          {years.map((year) => (
            <div key={year} className="mb-8">
              <div className="relative mb-3">
                <h2 className="text-3xl font-bold opacity-20 ">{year}</h2>
                <div className="absolute bottom-0 left-0 w-full border-b border-border/30"></div>
              </div>
              
              <div className="space-y-1.5">
                {postsByYear[year].map((post) => (
                  <article key={post.id} className="group transition-all duration-300">
                    <Link 
                      href={post.url!}
                      className="block py-2 border-b border-border/20 hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between gap-3 px-1.5">
                        <div className="flex-1">
                          <h2 className="text-sm font-medium opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-300">
                            {post.title}
                          </h2>
                        </div>
                        <time dateTime={post.date} className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
          <p className="text-muted-foreground text-sm">No blog posts available...</p>
        </div>
      )}
      </div>
    </div>
  );
}
