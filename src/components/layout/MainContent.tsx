import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-1 w-full">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </main>
  );
}
