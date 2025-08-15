import { getProjects } from '@/lib/db/projects';
import { Project } from '@/types';
import ProjectCard from '@/components/projects/ProjectCard';

// 模拟项目数据
const featuredProjects: Project[] = await getProjects(true);
const otherProjects: Project[] = await getProjects(false);

export default async function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of AI agents, full-stack applications, and developer tools I've built to solve real-world problems.
          </p>
        </div>

        {/* Featured Projects Section */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold">Featured Projects</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured={true} />
            ))}
          </div>
        </div>

        {/* Other Projects Section */}
        <div className="mb-12">
          <div className="flex items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
                  <path d="M18 9V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1Z" />
                </svg>
              </div>
              <h2 className="font-playfair text-xl md:text-2xl font-semibold text-muted-foreground">Other Projects</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured={false} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 border-t border-border/50">
          <h3 className="font-playfair text-xl font-semibold mb-3">Have an idea?</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            I'm always interested in collaborating on innovative projects. Let's build something amazing together.
          </p>
          <a
            href="/about"
            className="inline-flex items-center justify-center rounded-lg gradient-btn px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm gap-2 hover:shadow-md transition-shadow"
          >
            Get in Touch
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
