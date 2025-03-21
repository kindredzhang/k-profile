'use client';

import { useEffect, useState } from 'react';

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // 鼠标移动处理函数
    const handleMouseMove = (event: MouseEvent) => {
      setIsMoving(true);
      setOpacity(1);
      setPosition({ x: event.clientX, y: event.clientY });
      
      // 清除之前的定时器
      if (window.timeoutId) {
        clearTimeout(window.timeoutId);
      }
      
      // 设置新的定时器, 如果鼠标停止移动，逐渐降低不透明度
      window.timeoutId = setTimeout(() => {
        setIsMoving(false);
        // 渐变消失效果
        const fadeOut = setInterval(() => {
          setOpacity((prev) => {
            if (prev <= 0.05) {
              clearInterval(fadeOut);
              return 0;
            }
            return prev * 0.9;
          });
        }, 50);
      }, 100) as unknown as number;
    };

    // 添加事件监听器
    window.addEventListener('mousemove', handleMouseMove);

    // 清理函数
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (window.timeoutId) {
        clearTimeout(window.timeoutId);
      }
    };
  }, []);

  // 渲染两个跟随鼠标的元素，一个用于暗色模式，一个用于亮色模式
  return (
    <>
      {/* 暗色模式下的效果 */}
      <div 
        className="dark:block hidden pointer-events-none fixed z-0 transition-opacity duration-500"
        style={{
          opacity: opacity,
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, rgba(99, 102, 241, 0.03) 30%, transparent 70%)',
          transform: `translate(${position.x - 275}px, ${position.y - 275}px)`,
          filter: 'blur(30px)',
          willChange: 'transform, opacity',
        }}
      />
      
      {/* 亮色模式下的效果 */}
      <div 
        className="dark:hidden block pointer-events-none fixed z-0 transition-opacity duration-500"
        style={{
          opacity: opacity,
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(236, 72, 153, 0.03) 30%, transparent 70%)',
          transform: `translate(${position.x - 275}px, ${position.y - 275}px)`,
          filter: 'blur(30px)',
          willChange: 'transform, opacity',
        }}
      />
    </>
  );
}

// 为window添加timeoutId属性
declare global {
  interface Window {
    timeoutId?: number;
  }
}
