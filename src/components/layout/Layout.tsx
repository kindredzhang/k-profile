import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </div>
  );
}
