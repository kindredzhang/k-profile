/**
 * Time and Date utility class
 * 提供各种时间日期格式化和处理功能
 */
export class TimeUtils {
  
  /**
   * 格式化日期为完整格式
   * @param date - 日期字符串或Date对象
   * @returns 格式化的日期字符串 (e.g., "Jan 15, 2024")
   */
  static formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * 格式化日期为简短格式（用于列表展示）
   * @param date - 日期字符串或Date对象
   * @returns 简短格式的日期字符串 (e.g., "Jan 15")
   */
  static formatDateShort(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * 格式化日期为相对时间
   * @param date - 日期字符串或Date对象
   * @returns 相对时间字符串 (e.g., "2 days ago", "1 month ago")
   */
  static formatRelativeTime(date: string | Date): string {
    const now = new Date();
    const targetDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  }

  /**
   * 计算阅读时间
   * @param content - 文章内容
   * @param wordsPerMinute - 每分钟阅读字数，默认200
   * @returns 阅读时间字符串 (e.g., "5min")
   */
  static calculateReadingTime(content: string, wordsPerMinute: number = 200): string {
    const words = content.split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute) || 1;
    return `${readingTime}min`;
  }

  /**
   * 获取年份
   * @param date - 日期字符串或Date对象
   * @returns 年份数字
   */
  static getYear(date: string | Date): number {
    return new Date(date).getFullYear();
  }

  /**
   * 检查日期是否为今天
   * @param date - 日期字符串或Date对象
   * @returns 是否为今天
   */
  static isToday(date: string | Date): boolean {
    const today = new Date();
    const targetDate = new Date(date);
    
    return today.toDateString() === targetDate.toDateString();
  }

  /**
   * 检查日期是否为本周
   * @param date - 日期字符串或Date对象
   * @returns 是否为本周
   */
  static isThisWeek(date: string | Date): boolean {
    const today = new Date();
    const targetDate = new Date(date);
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today.setDate(today.getDate() - dayOfWeek));
    const endOfWeek = new Date(today.setDate(today.getDate() - dayOfWeek + 6));
    
    return targetDate >= startOfWeek && targetDate <= endOfWeek;
  }

  /**
   * 格式化为ISO日期字符串（用于HTML time元素的datetime属性）
   * @param date - 日期字符串或Date对象
   * @returns ISO格式的日期字符串
   */
  static toISOString(date: string | Date): string {
    return new Date(date).toISOString();
  }
}

// 保持向后兼容的导出
export const formattedDate = TimeUtils.formatDate;
export const readingTime = TimeUtils.calculateReadingTime;