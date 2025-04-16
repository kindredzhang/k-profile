'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const wasVisibleRef = useRef(false);

  // Handle scroll event to show/hide the button
  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      const shouldBeVisible = window.scrollY > 300;

      // If button wasn't visible before but should be now, trigger pulse animation
      if (!wasVisibleRef.current && shouldBeVisible) {
        setIsPulsing(true);
        // Stop pulsing after 2 seconds
        setTimeout(() => setIsPulsing(false), 2000);
      }

      wasVisibleRef.current = shouldBeVisible;
      setIsVisible(shouldBeVisible);
    };

    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);

    // Initial check
    toggleVisibility();

    // Clean up event listener
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg",
        "bg-primary/90 text-primary-foreground hover:bg-primary",
        "transition-all duration-300 transform hover:scale-105",
        "backdrop-blur-sm border border-primary/20",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        "dark:bg-primary/80 dark:hover:bg-primary/90",
        "dark:shadow-primary/20 dark:shadow-lg",
        "group overflow-hidden",
        isPulsing ? "animate-pulse" : "",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
      aria-label="Back to top"
    >
      {/* Background glow effect */}
      <span className="absolute inset-0 w-full h-full bg-primary/30 dark:bg-primary/40 blur-md transform scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100"></span>

      {/* Arrow icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10"
      >
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </button>
  );
}
