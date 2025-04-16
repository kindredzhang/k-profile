import ClientBackToTop from '@/components/ui/ClientBackToTop';
import ClientMouseGlow from '@/components/ui/ClientMouseGlow';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import MainContent from './MainContent';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#050505] relative w-screen overflow-hidden">
      {/* 背景装饰 */}
      <div className="dot-pattern"></div>
      <div className="gradient-sphere absolute top-40 left-1/4 w-96 h-96 opacity-50 dark:opacity-30"></div>
      <div className="gradient-sphere absolute bottom-40 right-1/4 w-80 h-80 opacity-50 dark:opacity-30"></div>

      <ClientMouseGlow />
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
      <ClientBackToTop />
    </div>
  );
}
