// import NewsletterForm from '@/components/home/NewsletterForm';
import { EmailIcon, GitHubIcon, TwitterIcon } from '@/components/ui/icons';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-4 md:py-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="md:max-w-xl">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-3 leading-tight">
              <span className="text-primary">Hi,</span> I&apos;m Kindred
            </h1>

            <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
              AI agent developer and full-stack engineer building intelligent systems and web applications.
              Focused on LLM integration, automation tools, and creating seamless user experiences.
            </p>
          </div>

          <div className="hidden md:block relative w-40 h-40 gradient-border">
            <Image
              src="/images/avatar.jpg"
              alt="Profile picture"
              width={160}
              height={160}
              className="absolute inset-0 rounded-full object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Brief Introduction */}
        <div className="mb-10 md:mb-12">
          <p className="text-base leading-relaxed mb-6">
            Creator of <Link href="/projects" className="text-primary hover:underline font-medium">AI Agent Platform</Link> and various full-stack applications. <br />
            Core expertise in <span className="text-primary font-medium">LangChain</span>, <span className="text-primary font-medium">LangGraph</span>,{' '}
            <span className="text-primary font-medium">Next.js</span>, and <span className="text-primary font-medium">TypeScript</span>.
          </p>

          <p className="text-base leading-relaxed">
            Dreaming up intelligent solutions and making them come true is where my passion lies. I write about AI development and full-stack engineering on my{' '}
            <Link href="/blog" className="text-primary hover:underline font-medium">blog</Link>.
            You can find my full projects list <Link href="/projects" className="text-primary hover:underline font-medium">here</Link>.
          </p>
        </div>

        {/* Current Focus */}
        <div className="mb-10 md:mb-12">
          <h2 className="text-xl font-bold mb-5 text-primary">Current Focus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-lg border border-border bg-card/50 hover:bg-card/70 transition-all">
              <h3 className="text-base font-semibold mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
                  <path d="M14 3v4a2 2 0 0 0 2 2h4"></path>
                  <path d="M18 21v-5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v5"></path>
                </svg>
                AI Agent Development
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Building intelligent agents with LangChain and OpenAI that can handle complex workflows,
                integrate with multiple APIs, and provide natural language interfaces for business automation.
              </p>
            </div>
            <div className="p-5 rounded-lg border border-border bg-card/50 hover:bg-card/70 transition-all">
              <h3 className="text-base font-semibold mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                Full-Stack Applications
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Creating end-to-end web applications with React, Next.js, and TypeScript.
                Focus on scalable architecture, modern UI/UX, and seamless user experiences across various domains.
              </p>
            </div>
          </div>
        </div>

        {/* Connect */}
        <div className="mb-10 md:mb-12">
          <h2 className="text-xl font-bold mb-5 text-primary">Find me on</h2>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/kindredzhang"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card/50 hover:bg-card/70 transition-colors text-sm"
            >
              <GitHubIcon className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://twitter.com/wanchun__"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card/50 hover:bg-card/70 transition-colors text-sm"
            >
              <TwitterIcon className="w-4 h-4" />
              Twitter
            </a>
            <a
              href="mailto:kindred.zhang.life@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card/50 hover:bg-card/70 transition-colors text-sm"
            >
              <EmailIcon className="w-4 h-4" />
              Email
            </a>
            <span className="text-muted-foreground text-sm">
              Or mail me at <a href="mailto:kindred.zhang.life@gmail.com" className="text-primary hover:underline">kindred.zhang.life@gmail.com</a>
            </span>
          </div>
        </div>

        {/* Newsletter Section */}
        {/* <NewsletterForm /> */}
      </div>
    </div>
  );
}