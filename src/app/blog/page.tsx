'use client';

import { BookIcon } from '@/components/ui/icons';
import { ListPost } from '@/types';
import { TimeUtils } from '@/utils';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const BLOG_CATEGORIES = [
  { id: 'all', name: 'Blog', active: true },
  { id: 'talks', name: 'Talks', active: false },
  { id: 'streams', name: 'Streams', active: false },
  { id: 'notes', name: 'Notes', active: false },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<ListPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<ListPost[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const allPosts = await response.json();
        setPosts(allPosts);
        setFilteredPosts(allPosts);
      } catch (error) {
        console.error('Failed to load posts:', error);
        setPosts([]);
        setFilteredPosts([]);
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => 
        post.category?.toLowerCase() === activeCategory ||
        post.tags?.some(tag => tag.toLowerCase() === activeCategory)
      );
      setFilteredPosts(filtered);
    }
  }, [activeCategory, posts]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Blog Category Navigation */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex gap-1 p-1 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full">
              {BLOG_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-foreground text-background shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Post List */}
          {filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <article key={post.id} className="group">
                  <Link 
                    href={post.url!}
                    className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted/30 transition-colors duration-200 group-hover:translate-x-1"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {post.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                      <time 
                        dateTime={TimeUtils.toISOString(post.date)}
                        className="text-xs text-muted-foreground/80"
                      >
                        {TimeUtils.formatDateShort(post.date)}
                      </time>
                      <span className="text-xs text-muted-foreground/80">
                        {post.reading_time}
                      </span>
                    </div>
                  </Link>
                </article>
                ))}
              </div>
              ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted/20 rounded-full flex items-center justify-center">
                <BookIcon width="24" height="24" className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                {activeCategory === 'all'
                  ? 'No posts yet'
                  : `No ${BLOG_CATEGORIES.find(cat => cat.id === activeCategory)?.name} content yet`}
                </h3>
                <p className="text-muted-foreground text-sm">
                {activeCategory === 'all'
                  ? 'Blog content is coming soon...'
                  : 'There is no content in this category yet.'}
                </p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
