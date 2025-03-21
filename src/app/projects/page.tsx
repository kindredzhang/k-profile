import Layout from '@/components/layout/Layout';
import Link from 'next/link';

// 模拟项目数据
const featuredProjects = [
  {
    id: 'project-1',
    title: 'Nuxt UI',
    description: 'A UI Library for Modern Web Applications',
    tags: ['Vue', 'TypeScript', 'Tailwind CSS'],
    stars: '2.8k',
    link: 'https://github.com/kindred/nuxt-ui'
  },
  {
    id: 'project-2',
    title: 'Vite Plugin Icons',
    description: 'Use any icon from popular icon sets in Vite projects',
    tags: ['Vite', 'JavaScript', 'Icons'],
    stars: '1.2k',
    link: 'https://github.com/kindred/vite-plugin-icons'
  }
];

const otherProjects = [
  {
    id: 'project-3',
    title: 'React Query Builder',
    description: 'A flexible and intuitive query builder for React applications',
    tags: ['React', 'TypeScript', 'Data'],
    stars: '850',
    link: 'https://github.com/kindred/react-query-builder'
  },
  {
    id: 'project-4',
    title: 'Markdown Editor',
    description: 'A lightweight Markdown editor with live preview and syntax highlighting',
    tags: ['JavaScript', 'Markdown', 'Editor'],
    stars: '620',
    link: 'https://github.com/kindred/markdown-editor'
  },
  {
    id: 'project-5',
    title: 'Color Palette Generator',
    description: 'Generate beautiful color palettes for your design projects',
    tags: ['Design', 'CSS', 'Color Theory'],
    stars: '430',
    link: 'https://github.com/kindred/color-palette'
  },
  {
    id: 'project-6',
    title: 'State Machine Library',
    description: 'A tiny but powerful state machine library for JavaScript applications',
    tags: ['JavaScript', 'State Management', 'Library'],
    stars: '380',
    link: 'https://github.com/kindred/state-machine'
  }
];

export default function ProjectsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-12">Projects</h1>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="border border-border rounded-lg p-6 bg-card hover:bg-card/80 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      <span>{project.stars}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Other Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="border border-border rounded-lg p-6 bg-card hover:bg-card/80 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      <span>{project.stars}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
