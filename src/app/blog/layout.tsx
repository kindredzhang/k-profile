// file: app/blog/layout.tsx

import React from 'react';
import Link from 'next/link';
import { Category } from '@/types';
import { getAllCategories } from '@/lib/db/categories';

export default async function BlogSectionLayout({ 
  children,
}: { 
  children: React.ReactNode;
}) {
  const categories: Category[] = await getAllCategories();

  return (
    <div className="container mx-auto px-4 py-4 md:py-6 relative">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* 分类标签导航 */}
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

        {children}
      </div>
    </div>
  );
}