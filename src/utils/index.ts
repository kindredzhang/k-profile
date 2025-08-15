import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 导出时间工具
export { TimeUtils, formattedDate, readingTime } from './time';

// string to hash
export const stringToHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

export const getFileStation = (url: string): string[] => {
  const regex = /\/storage\/v1\/object\/sign\/photos\/([^?]+)/;
  const match = url.match(regex);
  return match ? [match[1]] : [];
};
