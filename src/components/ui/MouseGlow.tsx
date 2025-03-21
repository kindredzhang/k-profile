'use client';

import { useEffect, useState } from 'react';

export default function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // 检测当前主题
    const detectTheme = () => {
      // 检查 localStorage 或默认使用暗色主题
      const storedTheme = localStorage.getItem('theme');
      setIsDark(storedTheme !== 'light');
    };

    // 初始检测主题
    detectTheme();

    let timeout: NodeJS.Timeout;

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      setIsMoving(true);
      
      // 清除之前的定时器
      clearTimeout(timeout);
      
      // 设置新定时器，在鼠标停止移动后淡出效果
      timeout = setTimeout(() => {
        setIsMoving(false);
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // 监听主题变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const target = mutation.target as HTMLElement;
          setIsDark(target.classList.contains('dark'));
        }
      });
    });
    
    // 如果存在 html 元素，则观察其 class 变化
    const htmlElement = document.documentElement;
    if (htmlElement) {
      observer.observe(htmlElement, { attributes: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  // 动态样式和类名
  const glowStyles = {
    left: `${mousePosition.x}px`,
    top: `${mousePosition.y}px`,
    opacity: isMoving ? 0.15 : 0,
    background: isDark 
      ? 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(80, 70, 230, 0) 70%)' 
      : 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(80, 70, 230, 0) 70%)',
  };

  return (
    <div 
      className="fixed pointer-events-none w-[300px] h-[300px] transform -translate-x-1/2 -translate-y-1/2 z-0 transition-opacity duration-300 blur-xl"
      style={glowStyles}
    />
  );
}
