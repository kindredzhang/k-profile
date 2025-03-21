import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';
import ClientMouseGlow from '@/components/ui/ClientMouseGlow';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* 背景装饰 */}
      <div className="dot-pattern"></div>
      <div className="gradient-sphere absolute top-40 left-1/4 w-96 h-96"></div>
      <div className="gradient-sphere absolute bottom-40 right-1/4 w-80 h-80"></div>
      
      <ClientMouseGlow />
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </div>
  );
}
