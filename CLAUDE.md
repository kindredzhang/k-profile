# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build` - Build production version
- `npm start` - Start production server
- `npm run lint` - Run Next.js linter

## Architecture Overview

This is a personal blog/portfolio site built with Next.js 15 using the App Router pattern. The site features:

**Core Architecture:**
- Next.js with TypeScript and App Router (`src/app/` directory)
- File-based routing with pages for home, blog, projects, about, and photo
- Markdown-based content system for blog posts stored in `public/posts/`
- Static JSON data for projects in `public/projects/index.json`
- Supabase integration for potential database features (currently minimal usage)

**UI Framework:**
- Tailwind CSS with shadcn/ui components (configured in `components.json`)
- Custom theme system with light/dark mode support
- Component aliases: `@/components`, `@/lib`, `@/utils` (configured in `tsconfig.json`)

**Content Management:**
- Blog posts are markdown files with frontmatter in `public/posts/{category}/` subdirectories
- Posts with `star: true` frontmatter are featured on home page
- Content processing uses gray-matter and reading time calculation
- Type definitions in `src/types/index.ts` define Post, Project, Photo structures

**Key Components:**
- `src/lib/db/posts.ts` - Core blog post processing logic (file-based, not database)
- `src/components/theme/ThemeProvider.tsx` - Client-side theme management with localStorage persistence
- `src/app/layout.tsx` - Root layout with Google AdSense integration and theme setup
- Layout components: Header, Footer, MainContent with MouseGlow and BackToTop effects

**Configuration:**
- `next.config.ts` includes image optimization for Unsplash and Supabase, domain redirects for kindred.blog
- TypeScript with path aliases and Next.js plugin
- Tailwind with typography plugin and CSS variables

**Development Notes:**
- Uses file system routing - blog posts accessed via `/blog/{slug}` regardless of category
- Photo page is currently placeholder (`暂无照片`)
- Project data is static JSON, not database-driven
- Environment variables needed for Supabase (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- all website words use english!!
