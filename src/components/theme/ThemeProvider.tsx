'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use state to avoid hydration mismatch
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  
  // Initialize theme on client-side only
  useEffect(() => {
    // Set mounted to true so we can safely show the UI that depends on client-side info
    setMounted(true);
    
    // Get initial theme preference
    const storedTheme = localStorage.getItem('theme') as Theme;
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = storedTheme || systemPreference;
    
    setTheme(initialTheme);
  }, []);
  
  // Update the DOM when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    // Save theme preference
    localStorage.setItem('theme', theme);
    
    // Toggle classes on document elements
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme, mounted]);

  // Provide value and children only when mounted to avoid hydration mismatch
  return (
    <ThemeContext.Provider
      value={{
        theme: mounted ? theme : 'light', // Default to light during SSR
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
