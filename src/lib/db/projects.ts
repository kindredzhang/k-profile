import { Project } from "@/types";
import fs from 'fs';
import path from 'path';

export async function getProjects(): Promise<Project[]> {
    try {
        const filePath = path.join(process.cwd(), 'public', 'projects', 'index.json');
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        const projects = JSON.parse(fileContents) as Project[];
        return projects;    
    } catch (error) {
        console.error('Error fetching projects from filesystem:', error);
        return [];
    }
}