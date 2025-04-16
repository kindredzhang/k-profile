import Layout from '@/components/layout/Layout';
import { BookIcon, CodeIcon, SendIcon } from '@/components/ui/icons';
import { getStaredPosts } from '@/lib/db/posts';
import { getProjects } from '@/lib/db/projects';
import { Project, StarPost } from '@/types';
import Link from 'next/link';

// 模拟最近博客文章数据
const recentPosts: StarPost[] = await getStaredPosts();

// 模拟精选项目数据
const featuredProjects: Project[] = await getProjects(true);

// 首页组件
export default async function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="md:max-w-xl">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 leading-tight">
                <span className="text-primary">Hi,</span> I'm Kindred
              </h1>

              <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                Software engineer and open-source creator specializing in modern web technologies.
                Building developer tools and UI libraries that empower better applications.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-md gradient-btn px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm gap-2"
                >
                  <BookIcon width="18" height="18" />
                  Read My Blog
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-md secondary-btn px-5 py-2 text-sm font-medium text-foreground shadow-sm gap-2"
                >
                  <CodeIcon width="18" height="18" />
                  View Projects
                </Link>
              </div>
            </div>

            <div className="hidden md:block relative w-48 h-48 gradient-border">
              <img
                src="/images/avatar.jpg"
                alt="Profile picture"
                className="absolute inset-0 rounded-full object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Recent Posts Section */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-playfair text-xl font-bold enhance-text flex items-center gap-2">
                <BookIcon width="22" height="22" className="text-primary" />
                Recent Posts
              </h2>
              <Link href="/blog" className="text-primary hover:underline text-sm inline-flex items-center gap-1">
                View all
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-grid">
              {recentPosts.map((post) => (
                <article key={post.id} className="group border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 bg-card/80 backdrop-blur-sm hover:backdrop-blur-md hover:bg-card/95 hover:shadow-sm enhanced-card responsive-card">
                  <Link href={post.url!} className="block p-4">
                    <time className="text-xs text-primary/80 font-medium mb-2 block">{post.date}</time>
                    <h3 className="text-base font-medium group-hover:text-primary transition-colors line-clamp-2 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/60 group-hover:text-primary transition-colors">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                      {post.title}
                    </h3>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Featured Projects Section */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-playfair text-xl font-bold enhance-text flex items-center gap-2">
                <CodeIcon width="22" height="22" className="text-primary" />
                Featured Projects
              </h2>
              <Link href="/projects" className="text-primary hover:underline text-sm inline-flex items-center gap-1">
                View all
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-grid">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={project.url}
                  className="group block p-4 rounded-lg border border-border bg-card/80 backdrop-blur-sm hover:backdrop-blur-md hover:border-primary/30 hover:bg-card/95 hover:shadow-sm transition-all duration-300 enhanced-card responsive-card"
                >
                  <h3 className="text-base font-medium mb-1 group-hover:text-primary transition-colors flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/60 group-hover:text-primary transition-colors">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18 9V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1Z"></path>
                    </svg>
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="mb-12 md:mb-16">
            <h2 className="font-playfair text-xl font-bold mb-4 enhance-text flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <circle cx="12" cy="8" r="5"></circle>
                <path d="M20 21a8 8 0 1 0-16 0"></path>
              </svg>
              About Me
            </h2>

            <div className="prose prose-sm prose-invert max-w-none">
              <p>
                <span className="inline-flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/60">
                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                    <path d="M17 2v5"></path>
                    <path d="M7 2v5"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                  I'm passionate about creating tools and libraries
                </span> that help developers build better applications.
                My focus is on performance, developer experience, and beautiful design.
              </p>

              <p>
                <span className="inline-flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/60">
                    <path d="m2 16 6-6 4 4 1-1 3-3 2 2 6-6"></path>
                    <path d="M17 10h4V6"></path>
                  </svg>
                  When I'm not coding,
                </span> you can find me listen rock music, reading science fiction, or experimenting with new photography.
              </p>

            </div>
          </div>

          {/* Newsletter Section */}
          <div className="p-8 rounded-lg border border-primary/30 bg-primary/10 backdrop-blur-md transition-all duration-300 hover:backdrop-blur-xl hover:border-primary/40 shadow-sm hover:shadow-md enhanced-card">
            <h2 className="font-playfair text-lg font-bold mb-2 enhance-text flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              Subscribe to my newsletter
            </h2>
            <p className="text-sm text-muted-foreground mb-3">Get notified about new articles, projects and updates.</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 text-sm rounded-md border border-border bg-background/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background/90 transition-all duration-300 overflow-hidden"
              />
              <button className="px-5 py-3 text-sm font-semibold rounded-md gradient-btn text-primary-foreground inline-flex items-center gap-2">
                <SendIcon />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
