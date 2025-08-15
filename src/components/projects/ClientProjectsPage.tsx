'use client';

import { Project } from '@/types';
import ProjectCard from '@/components/projects/ProjectCard';
import { useState } from 'react';

interface ClientProjectsPageProps {
  featuredProjects: Project[];
  otherProjects: Project[];
}

export default function ClientProjectsPage({ featuredProjects, otherProjects }: ClientProjectsPageProps) {
  const [showToast, setShowToast] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('kindred.zhang.life@gmail.com');
      showSuccessToast();
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = 'kindred.zhang.life@gmail.com';
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showSuccessToast();
      } catch (execErr) {
        console.error('Failed to copy email');
      }
      document.body.removeChild(textArea);
    }
  };

  const showSuccessToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  return (
    <div className="container mx-auto px-4 py-4 md:py-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-[1.2] pb-1">
            My Projects
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            A collection of AI agents, full-stack applications, and developer tools I&apos;ve built to solve real-world problems.
          </p>
        </div>

        {/* Featured Projects Section */}
        <div className="mb-10 md:mb-12">
          <div className="flex items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h2 className="font-playfair text-xl md:text-2xl font-bold">Featured Projects</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured={true} />
            ))}
          </div>
        </div>

        {/* Other Projects Section */}
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
                  <path d="M18 9V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1Z" />
                </svg>
              </div>
              <h2 className="font-playfair text-lg md:text-xl font-semibold text-muted-foreground">Other Projects</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured={false} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-8 border-t border-border/50">
          <h3 className="font-playfair text-lg font-semibold mb-2">Have an idea?</h3>
          <p className="text-muted-foreground text-sm mb-5 max-w-lg mx-auto">
            I&apos;m always interested in collaborating on innovative projects. Let&apos;s build something amazing together.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="mailto:kindred.zhang.life@gmail.com"
              className="inline-flex items-center justify-center rounded-lg gradient-btn px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm gap-2 hover:shadow-md transition-shadow"
            >
              Email Me
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22 6 12 13 2 6" />
              </svg>
            </a>
            <a
              href="https://twitter.com/wanchun__"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card/50 hover:bg-card/70 px-6 py-3 text-sm font-medium text-foreground shadow-sm gap-2 transition-colors"
            >
              Twitter DM
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Or click to copy: 
            <button 
              onClick={copyEmail}
              className="font-mono bg-muted/50 px-2 py-1 rounded text-primary hover:bg-muted/70 transition-colors cursor-pointer ml-1 inline-flex items-center gap-1"
            >
              kindred.zhang.life@gmail.com
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-card border border-border shadow-lg px-4 py-3 rounded-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span className="text-foreground font-medium">Email copied to clipboard!</span>
          </div>
        </div>
      )}
    </div>
  );
}