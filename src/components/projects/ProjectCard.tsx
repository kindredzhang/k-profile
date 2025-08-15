import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <div className="group border border-border rounded-xl p-6 bg-card/80 backdrop-blur-sm hover:bg-card/95 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col enhanced-card">
      <div className="flex justify-between items-start mb-3">
        <a 
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xl font-semibold group-hover:text-primary transition-colors flex-1 mr-2 hover:underline cursor-pointer"
        >
          {project.title}
        </a>
      </div>
      
      <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">
        {project.description}
      </p>
      
      <div className="mt-auto">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}