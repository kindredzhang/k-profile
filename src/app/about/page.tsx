const skills = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'CSS/SCSS']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'RESTful APIs']
  },
  {
    category: 'Tools & Practices',
    items: ['Git', 'GitHub Actions', 'Webpack', 'Jest', 'Continuous Integration']
  }
];

// Current projects
const projects = [
  {
    title: 'Personal Portfolio & Blog',
    description: 'A modern, responsive website built with Next.js and Tailwind CSS, featuring dark/light mode and markdown content support.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS']
  },
  {
    title: 'Task Management Application',
    description: 'A full-stack application for managing tasks and projects with collaborative features, real-time updates, and data visualization.',
    tags: ['React', 'Node.js', 'MongoDB']
  }
];

export default function AboutPage() {
  return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">About Me</h1>
          
          <div className="mb-10 bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-primary">Journey as an Independent Developer</h2>
            
            <p className="text-base mb-4">
              I&apos;m an independent developer passionate about creating elegant solutions to complex problems. My journey in software development began with a curiosity about how digital tools could enhance our daily lives and has evolved into a dedicated pursuit of crafting high-quality, user-centered applications.
            </p>
            
            <p className="text-base mb-4">
              As someone who values continuous learning, I&apos;m constantly exploring new technologies and methodologies to improve my craft. I believe in writing clean, maintainable code and creating experiences that delight users while solving real problems.
            </p>
            
            <p className="text-base">
              When I&apos;m not coding, I enjoy sharing my knowledge through blog posts and contributing to open-source projects that align with my values of accessibility, performance, and developer experience.
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
                  <h3 className="text-base font-medium">Code Quality First</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  I believe that maintainable, well-structured code is just as important as the end product. Clean architecture and thorough testing are foundations of my development process.
                </p>
              </div>
              
              <div className="p-5 rounded-lg border border-border bg-card/80 transition-all">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-3">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                  <h3 className="text-base font-medium">User-Centered Design</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Technology should serve humans, not the other way around. I prioritize intuitive interfaces, accessibility, and thoughtful UX in everything I build.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50">
            <h2 className="text-xl font-semibold mb-4 text-primary">Support My Work</h2>
            <p className="text-base mb-5">
              As an independent developer, I&apos;m committed to creating valuable open-source software and educational content. If you appreciate my work, there are several ways you can show support:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card/50 transition-all hover:border-primary/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-3">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <h3 className="text-base font-medium mb-2">Contribute</h3>
                <p className="text-xs text-center text-muted-foreground">
                  Help improve my open-source projects through code contributions, issue reporting, or documentation.
                </p>
              </div>
              
              <div className="flex flex-col items-center p-4 rounded-lg border border-primary/30 bg-card/50 transition-all hover:bg-card/70">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-3">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                <h3 className="text-base font-medium mb-2">Sponsor</h3>
                <p className="text-xs text-center text-muted-foreground">
                  Financial support helps me dedicate more time to creating open-source software and educational content.
                </p>
              </div>
              
              <div className="flex flex-col items-center p-4 rounded-lg border border-border bg-card/50 transition-all hover:border-primary/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-3">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                <h3 className="text-base font-medium mb-2">Share</h3>
                <p className="text-xs text-center text-muted-foreground">
                  Spread the word about my projects and content within your network and professional communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
