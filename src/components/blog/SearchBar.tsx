'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from '@/components/ui/icons';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 处理搜索表单提交
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // 处理点击外部关闭搜索框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node) && !isFocused) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFocused]);

  return (
    <div className="relative">
      {/* 搜索按钮（小屏幕显示） */}
      <button
        type="button"
        className={`md:hidden flex items-center justify-center text-primary/80 hover:text-primary transition-all
                   ${isExpanded ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
        onClick={() => {
          setIsExpanded(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        aria-label="打开搜索"
      >
        <SearchIcon width="20" height="20" />
      </button>

      {/* 搜索表单 */}
      <form 
        onSubmit={handleSubmit}
        className={`flex items-center transition-all duration-300 origin-right
                   ${isExpanded 
                     ? 'w-full opacity-100 scale-100' 
                     : 'md:w-full md:opacity-100 w-0 opacity-0 scale-90 md:scale-100'}`}
      >
        <div className="relative w-full group">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章..."
            className="w-full py-1.5 px-4 pl-9 rounded-full text-sm bg-card/70 border border-border 
                      focus:border-primary/40 focus:ring-1 focus:ring-primary/30 outline-none backdrop-blur-sm
                      transition-all duration-300 group-hover:border-primary/30"
            onFocus={() => {
              setIsExpanded(true);
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/50 group-hover:text-primary/70 transition-colors duration-300">
            <SearchIcon width="16" height="16" />
          </div>
          
          {/* 清除按钮 - 当有输入内容时显示 */}
          {query && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary/50 hover:text-primary/90 transition-colors"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              aria-label="清除搜索"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </button>
          )}
        </div>
        
        <button
          type="submit"
          className="ml-2 px-3 py-1.5 rounded-full text-sm bg-primary/80 text-white hover:bg-primary 
                    transition-colors duration-200 hidden md:block"
          disabled={!query.trim()}
        >
          搜索
        </button>
      </form>
    </div>
  );
}
