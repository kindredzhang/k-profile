'use client';

import Link from 'next/link';
import { Tag } from '@/lib/supabase';
import { useEffect, useState } from 'react';

interface TagCloudProps {
  tags: (Tag & { post_count: number })[];
}

export default function TagCloud({ tags }: TagCloudProps) {
  const [mounted, setMounted] = useState(false);
  
  // 确保只在客户端渲染
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // 计算标签字体大小，基于文章数量
  const maxCount = Math.max(...tags.map(tag => tag.post_count));
  const minCount = Math.min(...tags.map(tag => tag.post_count));
  const fontSizeScale = (count: number) => {
    // 将文章数量映射到字体大小范围 (0.8rem - 1.4rem)
    const minSize = 0.8;
    const maxSize = 1.4;
    // 如果所有标签的文章数量相同，则使用默认大小
    if (maxCount === minCount) return 1;
    return minSize + ((count - minCount) / (maxCount - minCount)) * (maxSize - minSize);
  };

  return (
    <div className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
      <h3 className="text-lg font-medium mb-3">标签云</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="transition-all duration-300 hover:scale-105"
            style={{ opacity: 1 }}
          >
            <Link
              href={`/blog/tag/${tag.slug}`}
              className="inline-block px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/20 text-primary/80 hover:text-primary transition-all duration-300"
              style={{ fontSize: `${fontSizeScale(tag.post_count)}rem` }}
            >
              {tag.name}
              <span className="ml-1 text-xs opacity-70">({tag.post_count})</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
