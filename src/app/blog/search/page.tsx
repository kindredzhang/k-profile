'use client';

import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PostWithDetails } from '@/lib/supabase';
import { BookIcon, SearchIcon } from '@/components/ui/icons';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<PostWithDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResults() {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
          throw new Error('查询失败');
        }
        
        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error('搜索错误:', err);
        setError('查询过程中发生错误，请稍后再试。');
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-16 relative">
        {/* 背景装饰 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 pt-4">
          {/* 搜索标题 */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold enhance-text mb-4">搜索结果</h1>
            <div className="flex items-center gap-2 text-lg text-muted-foreground">
              <SearchIcon className="w-5 h-5 text-primary/60" />
              <span>搜索词: </span>
              <span className="font-medium text-primary">"{query}"</span>
            </div>
          </div>

          {/* 搜索状态 */}
          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 mb-4"></div>
                <div className="h-4 w-32 bg-primary/10 rounded"></div>
              </div>
            </div>
          )}

          {/* 错误状态 */}
          {error && (
            <div className="text-center py-8 enhanced-card bg-card/80 backdrop-blur-sm p-8 rounded-lg border border-border">
              <div className="text-red-500 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <p className="font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* 搜索结果 */}
          {!loading && !error && (
            <>
              {results.length > 0 ? (
                <div className="space-y-6">
                  <p className="text-muted-foreground mb-8">找到 {results.length} 条结果</p>
                  
                  {results.map((post) => (
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
                            {post.category && (
                              <div className="flex items-center gap-2 text-sm mt-4">
                                <Link 
                                  href={`/blog/category/${post.category.slug}`}
                                  className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                >
                                  {post.category.name}
                                </Link>
                              </div>
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
              ) : (
                <>
                  {query && (
                    <div className="text-center py-16 enhanced-card bg-card/80 backdrop-blur-sm p-8 rounded-lg border border-border">
                      <BookIcon width="48" height="48" className="text-primary/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">未找到与 "{query}" 相关的文章</p>
                    </div>
                  )}
                  {!query && (
                    <div className="text-center py-16 enhanced-card bg-card/80 backdrop-blur-sm p-8 rounded-lg border border-border">
                      <SearchIcon width="48" height="48" className="text-primary/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">请输入搜索词查询相关文章</p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
