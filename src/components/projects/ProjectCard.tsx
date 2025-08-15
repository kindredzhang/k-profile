import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <div className="group border border-border rounded-xl p-6 bg-card/80 backdrop-blur-sm hover:bg-card/95 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col enhanced-card">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors flex-1 mr-2">
          {project.title}
        </h3>
      </div>
      
      <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">
        {project.description}
      </p>
      
      <div className="mt-auto space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className={`
                text-xs font-medium
                ${featured 
                  ? 'px-3 py-1 bg-primary/10 text-primary rounded-full' 
                  : 'px-3 py-1 bg-primary/10 text-primary rounded-full'
                }
              `}
            >
              {tag}
            </span>
          ))}
        </div>
        
        <a 
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
        >
          View Project
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="ml-2"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
    </div>
  );
}