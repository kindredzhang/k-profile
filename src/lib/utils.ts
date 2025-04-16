import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formattedDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
});

export const readingTime = (content: string) => {
  const words = content.split(' ').length;
  const readingTime = Math.ceil(words / 200) || 5;
  return `${readingTime}min`;
};