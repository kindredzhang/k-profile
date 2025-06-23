'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    // 计算阅读进度
    const calculateReadingProgress = () => {
      const contentElement = document.querySelector('article');
      if (!contentElement) return;

      const contentHeight = contentElement.scrollHeight - contentElement.clientHeight;
      const windowHeight = window.innerHeight;
      
      const distance = contentElement.getBoundingClientRect().top;
      const offset = windowHeight - distance;
      
      if (offset > 0) {
        let percentage = 0;
        
        if (offset > contentHeight) {
          percentage = 100;
        } else {
          percentage = Math.min(100, (offset / contentHeight) * 100);
        }
        
        setReadingProgress(percentage);
      } else {
        setReadingProgress(0);
      }
    };

    // 初始计算
    calculateReadingProgress();
    
    // 添加滚动事件监听器
    window.addEventListener('scroll', calculateReadingProgress);
    
    // 清理函数
    return () => {
      window.removeEventListener('scroll', calculateReadingProgress);
    };
  }, []);

  return (
    <div 
      className="reading-progress" 
      style={{ transform: `scaleX(${readingProgress / 100})` }}
    />
  );
}
