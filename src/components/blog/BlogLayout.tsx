import React from 'react';
import Layout from '@/components/layout/Layout';

import Link from 'next/link';
import { Category } from '@/types';

interface BlogLayoutProps {
  children: React.ReactNode;
  categories?: Category[];
  activeCategory?: string;
  title?: string;
}

export default function BlogLayout({ 
  children, 
  categories = [], 
  activeCategory = 'blog',
  title
}: BlogLayoutProps) {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 md:py-6 relative">
        {/* 背景装饰 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          {/* 页面标题 - 如果提供 */}
          {title && (
            <h1 className="text-3xl md:text-4xl font-bold mb-6 enhance-text">{title}</h1>
          )}
          
          {/* 分类标签导航 - 如果提供分类 */}
          {categories.length > 0 && (
            <div className="flex items-center mb-3 border-b border-border pb-2">
              <div className="flex gap-3 md:gap-5 overflow-x-auto">
                {categories.map((category: Category) => (
                  <Link 
                    key={category.id}
                    href={`/${category.slug}`}
                    className={`text-base md:text-lg font-medium pb-1.5 border-b-2 px-1 transition-all duration-300 
                      ${category.slug === activeCategory 
                        ? 'border-primary text-primary opacity-100' 
                        : 'border-transparent hover:border-primary/40 text-muted-foreground hover:text-primary/80 opacity-40 hover:opacity-90'}`}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 主要内容 */}
          {children}
        </div>
      </div>
    </Layout>
  );
}
