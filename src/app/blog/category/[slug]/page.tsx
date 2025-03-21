import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { BookIcon } from '@/components/ui/icons';
import { getAllPosts, getAllCategories, getPostsByCategory } from '@/lib/db';
import { PostWithDetails, Category } from '@/lib/supabase';
import { notFound } from 'next/navigation';

// 获取当前年份
function getCurrentYear() {
  return new Date().getFullYear();
}

// 生成静态页面参数
export async function generateStaticParams() {
  // 从数据库获取所有分类
  const categories = await getAllCategories();
  
  // 为每个分类创建参数对象
  return categories.map(category => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // 从数据库获取文章和分类
  const slug = params.slug;
  const categories = await getAllCategories();
  const posts = await getPostsByCategory(slug);
  
  // 获取当前分类信息
  const currentCategory = categories.find(cat => cat.slug === slug);
  
  // 如果找不到该分类，返回404
  if (!currentCategory) {
    notFound();
  }
  
  // 按年份分组文章
  const postsByYear = posts.reduce((acc: Record<string, PostWithDetails[]>, post) => {
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
      <div className="container mx-auto px-4 py-12 md:py-16 relative">
        {/* 背景装饰 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 pt-4">
          {/* 分类标签导航 - 更紧凑的设计 */}
          <div className="flex items-center mb-6 border-b border-border pb-2">
            <div className="flex gap-4 md:gap-6 overflow-x-auto">
              {categories.map((category: Category) => (
                <Link 
                  key={category.id}
                  href={category.slug === 'blog' ? '/blog' : `/blog/category/${category.slug}`}
                  className={`text-lg md:text-xl font-medium pb-2 border-b-2 px-1 transition-all duration-300 
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
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold enhance-text mb-4">{currentCategory.name}</h1>
            {currentCategory.description && (
              <p className="text-lg text-muted-foreground">{currentCategory.description}</p>
            )}
          </div>

          {posts.length > 0 ? (
            <div>
              {/* 按年份分组的文章列表 */}
              {years.map((year) => (
                <div key={year} className="mb-16">
                  {/* 年份标题 - 大数字 */}
                  <div className="relative mb-10">
                    <h2 className="text-9xl font-bold opacity-10 enhance-text">{year}</h2>
                    <div className="absolute bottom-0 left-0 w-full border-b border-border"></div>
                  </div>
                  
                  {/* 该年份的文章 */}
                  <div className="space-y-6">
                    {postsByYear[year].map((post) => (
                      <article key={post.id} className="group enhanced-card hover:shadow-md transition-all duration-300">
                        <Link 
                          href={`/posts/${post.slug}`}
                          className="block p-6 rounded-lg border border-border bg-card/80 backdrop-blur-sm hover:backdrop-blur-md hover:border-primary/30 hover:bg-card/95 group-hover:translate-y-[-2px] transition-all duration-300"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/60 group-hover:text-primary transition-colors">
                                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                                  <polyline points="14 2 14 8 20 8"></polyline>
                                </svg>
                                {post.title}
                              </h2>
                              {post.description && (
                                <p className="text-muted-foreground">{post.description}</p>
                              )}
                            </div>
                            <div className="flex items-center text-sm text-primary/80 font-medium whitespace-nowrap">
                              <time dateTime={post.published_at || post.created_at} className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                                  <line x1="16" x2="16" y1="2" y2="6"></line>
                                  <line x1="8" x2="8" y1="2" y2="6"></line>
                                  <line x1="3" x2="21" y1="10" y2="10"></line>
                                </svg>
                                {new Date(post.published_at || post.created_at).toLocaleDateString('zh-CN', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </time>
                              <span className="mx-2 text-primary/30">•</span>
                              <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                {/* 添加阅读时间估算 */}
                                {Math.ceil(post.content.length / 1000)} min
                              </span>
                              {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {post.tags.map(tag => (
                                    <span key={tag.id} className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
                                      #{tag.name}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 enhanced-card bg-card/80 backdrop-blur-sm p-8 rounded-lg border border-border">
              <BookIcon width="48" height="48" className="text-primary/50 mx-auto mb-4" />
              <p className="text-muted-foreground">该分类下暂无文章</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
