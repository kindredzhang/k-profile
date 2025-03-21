import Layout from '@/components/layout/Layout';
import { BookIcon } from '@/components/ui/icons';
import { getAllCategories, getPostsByCategory } from '@/lib/db';
import { Category, PostWithDetails } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ 
  params,
}: {
  params: {
    slug: string;
  }
}) {
  // 从已解析的参数中获取slug
  const slug = params.slug;
  console.log('Fetching category posts with slug:', slug);
  
  // 从数据库获取文章和分类
  const categories = await getAllCategories();
  const posts = await getPostsByCategory(slug);
  // 获取当前分类信息
  const currentCategory = categories.find(cat => cat.slug === slug);
  
  // 如果找不到该分类，返回404
  if (!currentCategory) {
    notFound();
  }
  
  // 按年份分组文章
  const postsByYear = posts.reduce((acc: Record<string, PostWithDetails[]>, post: PostWithDetails) => {
    // 使用published_at或created_at获取年份
    const date = post.published_at || post.created_at;
    const year = new Date(date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<string, PostWithDetails[]>);

  // 获取所有年份并排序
  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 md:py-8 relative">
        {/* 背景装饰 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          {/* 分类标签导航 - 更紧凑的设计 */}
          <div className="flex items-center mb-4 border-b border-border pb-2">
            <div className="flex gap-4 md:gap-6 overflow-x-auto">
              {categories.map((category: Category) => (
                <Link 
                  key={category.id}
                  href={category.slug === 'blog' ? '/blog' : `/blog/category/${category.slug}`}
                  className={`text-base md:text-lg font-medium pb-2 border-b-2 px-1 transition-all duration-300 
                    ${category.slug === slug 
                      ? 'border-primary text-primary opacity-100' 
                      : 'border-transparent hover:border-primary/40 text-muted-foreground hover:text-primary/80 opacity-40 hover:opacity-90'}`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 分类标题和描述 */}
          {/* <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold enhance-text mb-4">{currentCategory.name}</h1>
            {currentCategory.description && (
              <p className="text-lg text-muted-foreground">{currentCategory.description}</p>
            )}
          </div> */}

          {posts.length > 0 ? (
            <div>
              {/* 按年份分组的文章列表 */}
              {years.map((year) => (
                <div key={year} className="mb-8">
                  {/* 年份标题 - 简化版 */}
                  <div className="relative mb-4">
                    <h2 className="text-4xl font-bold opacity-30 enhance-text">{year}</h2>
                    <div className="absolute bottom-0 left-0 w-full border-b border-border/50"></div>
                  </div>
                  
                  {/* 该年份的文章 - 简化列表 */}
                  <div className="space-y-2">
                    {postsByYear[year].map((post) => (
                      <article key={post.id} className="group transition-all duration-300">
                        <Link 
                          href={`/blog/posts/${post.slug}`}
                          className="block py-3 border-b border-border/30 hover:border-primary/30 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                              <h2 className="text-base font-medium group-hover:text-primary transition-colors">
                                {post.title}
                              </h2>
                              {post.tags && post.tags.length > 0 && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  <span className="ml-0">
                                    {post.tags.slice(0, 2).map((tag, i) => (
                                      <span key={tag.id} className="text-primary/70">
                                        {i > 0 && ', '}{tag.name}
                                      </span>
                                    ))}
                                    {post.tags.length > 2 && <span className="text-muted-foreground"> ...</span>}
                                  </span>
                                </div>
                              )}
                            </div>
                            <time dateTime={post.published_at || post.created_at} className="text-sm text-muted-foreground whitespace-nowrap">
                              {new Date(post.published_at || post.created_at).toLocaleDateString('zh-CN', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </time>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-card/50 p-6 rounded-lg border border-border/50">
              <BookIcon width="32" height="32" className="text-primary/50 mx-auto mb-3" />
              <p className="text-muted-foreground">该分类下暂无文章</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
