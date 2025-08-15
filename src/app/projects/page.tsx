import { getProjects } from '@/lib/db/projects';
import { Project } from '@/types';
import ClientProjectsPage from '@/components/projects/ClientProjectsPage';

// 模拟项目数据
const featuredProjects: Project[] = await getProjects(true);
const otherProjects: Project[] = await getProjects(false);

export default async function ProjectsPage() {
  return (
    <ClientProjectsPage 
      featuredProjects={featuredProjects} 
      otherProjects={otherProjects} 
    />
  );
}
