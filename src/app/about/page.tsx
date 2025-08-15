const skills = [
  {
    category: 'AI & LLM',
    items: ['LangChain', 'OpenAI API', 'Agent Development', 'RAG Systems', 'Prompt Engineering']
  },
  {
    category: 'Full-Stack',
    items: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python']
  },
  {
    category: 'Tools & Infrastructure',
    items: ['Docker', 'AWS', 'PostgreSQL', 'Vector Databases', 'CI/CD']
  }
];

// Current projects
const projects = [
  {
    title: 'AI Agent Platform',
    description: 'Building intelligent agents that can handle complex workflows, integrate with multiple APIs, and provide natural language interfaces for business automation.',
    tags: ['LangChain', 'OpenAI', 'Python', 'FastAPI']
  },
  {
    title: 'Full-Stack SaaS Applications',
    description: 'End-to-end web applications with modern UI/UX, scalable backend architecture, and seamless user experiences for various business domains.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind']
  }
];

export default function AboutPage() {
  return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">About Me</h1>
          
          <div className="mb-10 bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-primary">AI Agent Developer & Full-Stack Engineer</h2>
            
            <p className="text-base mb-4">
              I specialize in developing AI agents and building full-stack applications that solve real-world problems. My focus is on creating intelligent systems that can understand, reason, and act autonomously while maintaining seamless integration with existing workflows.
            </p>
            
            <p className="text-base mb-4">
              With expertise in LLM integration and modern web technologies, I build everything from conversational AI interfaces to complex automation systems. I&apos;m passionate about making AI accessible and practical for businesses of all sizes.
            </p>
            
            <p className="text-base">
              Currently exploring the intersection of AI and user experience, working on projects that demonstrate how intelligent systems can enhance rather than replace human capabilities.
            </p>
          </div>
          
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-primary">Skills & Expertise</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.map((skillGroup, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg border border-border hover:border-primary/30 bg-card/80 hover:bg-card/90 transition-all"
                >
                  <h3 className="font-medium mb-3 text-center border-b border-border/50 pb-2">{skillGroup.category}</h3>
                  <ul className="space-y-1">
                    {skillGroup.items.map((skill, idx) => (
                      <li key={idx} className="text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 flex-shrink-0">
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-primary">Current Projects</h2>
            
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="p-5 rounded-lg border border-border hover:border-primary/30 bg-card/80 hover:bg-card/90 transition-all">
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-primary">Work Philosophy</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-lg border border-border bg-card/80 transition-all">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-3">
                    <path d="M2 12h5"></path>
                    <path d="M17 12h5"></path>
                    <path d="M9 6v12"></path>
                    <path d="M15 6v12"></path>
                  </svg>
                  <h3 className="text-base font-medium">AI-First Development</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Building with intelligence from the ground up. Every system I create is designed to learn, adapt, and improve over time through thoughtful AI integration.
                </p>
              </div>
              
              <div className="p-5 rounded-lg border border-border bg-card/80 transition-all">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-3">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                  <h3 className="text-base font-medium">End-to-End Solutions</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  From concept to deployment, I handle every aspect of application development. Full-stack capabilities ensure seamless integration and optimal performance.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50">
            <h2 className="text-xl font-semibold mb-4 text-primary">Let&apos;s Build Something Together</h2>
            <p className="text-base mb-5">
              Interested in AI automation, full-stack development, or exploring new possibilities with intelligent systems? I&apos;m always open to discussing innovative projects and collaboration opportunities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card/50 transition-all hover:border-primary/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-3">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <h3 className="text-base font-medium mb-2">Consulting</h3>
                <p className="text-xs text-center text-muted-foreground">
                  AI strategy, technical architecture, and implementation guidance for your next project.
                </p>
              </div>
              
              <div className="flex flex-col items-center p-4 rounded-lg border border-primary/30 bg-card/50 transition-all hover:bg-card/70">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-3">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                <h3 className="text-base font-medium mb-2">Development</h3>
                <p className="text-xs text-center text-muted-foreground">
                  Custom AI agents and full-stack applications built to solve your specific business challenges.
                </p>
              </div>
              
              <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card/50 transition-all hover:border-primary/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-3">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                <h3 className="text-base font-medium mb-2">Collaboration</h3>
                <p className="text-xs text-center text-muted-foreground">
                  Partner with me on innovative projects that push the boundaries of what&apos;s possible with AI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
