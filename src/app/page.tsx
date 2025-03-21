import Layout from '@/components/layout/Layout';
import Link from 'next/link';

// 模拟最近博客文章数据
const recentPosts = [
  {
    id: 'post-1',
    title: 'Migrating to Server Components',
    date: 'Mar 8',
    url: '/blog/migrating-to-server-components'
  },
  {
    id: 'post-2',
    title: 'Why I Switched to Bun',
    date: 'Feb 12',
    url: '/blog/why-i-switched-to-bun'
  },
  {
    id: 'post-3',
    title: 'The Future of React Server Components',
    date: 'Jan 24',
    url: '/blog/future-of-react-server-components'
  }
];

// 模拟精选项目数据
const featuredProjects = [
  {
    id: 'project-1',
    title: 'Nuxt UI',
    description: 'A UI Library for Modern Web Applications',
    url: '/projects/nuxt-ui'
  },
  {
    id: 'project-2',
    title: 'Vite Plugin Icons',
    description: 'Use any icon from popular icon sets in Vite projects',
    url: '/projects/vite-plugin-icons'
  }
];

// 首页组件
export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="md:max-w-xl">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 leading-tight">
                <span className="text-primary">Hello,</span> I'm Kindred
              </h1>
              
              <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                Software engineer and open-source creator specializing in modern web technologies.
                Building developer tools and UI libraries that empower better applications.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/blog" 
                  className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                >
                  Read My Blog
                </Link>
                <Link 
                  href="/projects" 
                  className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-secondary transition-colors"
                >
                  View Projects
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-4xl font-playfair font-bold text-primary/80">
                K
              </div>
            </div>
          </div>
          
          {/* Recent Posts Section */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-playfair text-xl font-bold">Recent Posts</h2>
              <Link href="/blog" className="text-primary hover:underline text-sm">View all</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentPosts.map((post) => (
                <article key={post.id} className="group border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
                  <Link href={post.url} className="block p-4">
                    <time className="text-xs text-primary/80 font-medium mb-2 block">{post.date}</time>
                    <h3 className="text-base font-medium group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                  </Link>
                </article>
              ))}
            </div>
          </div>
          
          {/* Featured Projects Section */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-playfair text-xl font-bold">Featured Projects</h2>
              <Link href="/projects" className="text-primary hover:underline text-sm">View all</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredProjects.map((project) => (
                <Link 
                  key={project.id} 
                  href={project.url}
                  className="group block p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-card/80 transition-all"
                >
                  <h3 className="text-base font-medium mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </Link>
              ))}
            </div>
          </div>
          
          {/* About Section */}
          <div className="mb-12 md:mb-16">
            <h2 className="font-playfair text-xl font-bold mb-4">About Me</h2>
            
            <div className="prose prose-sm prose-invert max-w-none">
              <p>
                I'm passionate about creating tools and libraries that help developers build better applications.
                My focus is on performance, developer experience, and beautiful design.
              </p>
              
              <p>
                When I'm not coding, you can find me hiking in the mountains, reading science fiction, or experimenting with new cooking recipes.
              </p>
              
              <p>
                I occasionally <Link href="/talks" className="text-primary hover:underline">speak at conferences</Link> about web development, open source, and developer tools.
                If you'd like to support my work, consider <Link href="/sponsors" className="text-primary hover:underline">becoming a sponsor</Link>.
              </p>
            </div>
          </div>
          
          {/* Newsletter Section */}
          <div className="p-5 rounded-lg border border-primary/20 bg-primary/5">
            <h2 className="font-playfair text-lg font-bold mb-2">Subscribe to my newsletter</h2>
            <p className="text-sm text-muted-foreground mb-3">Get notified about new articles, projects and updates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-3 py-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
