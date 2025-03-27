import Layout from '@/components/layout/Layout';
import { getProjects } from '@/lib/db/projects';
import { Project } from '@/types';

const allProjects: Project[] = await getProjects();
const featuredProjects = allProjects.filter((project) => project.is_featured);
const otherProjects = allProjects.filter((project) => !project.is_featured);

export default async function ProjectsPage() {
  const renderProjectCard = (project: Project) => (
    <div
      key={project.id}
      className="border border-border rounded-md p-4 bg-card hover:bg-card/80 transition-colors"
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-lg font-semibold">{project.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-1 py-0.5 bg-muted text-muted-foreground text-xs rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-primary hover:underline inline-flex items-center"
      >
        View Project
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-3 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-10">Projects</h1>
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredProjects.map(renderProjectCard)}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Other Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherProjects.map(renderProjectCard)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
