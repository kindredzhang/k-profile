import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('缺少Supabase环境变量。请检查.env.local文件。');
}

// 创建Supabase客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 获取文章类型定义
export type Post = {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  content: string;
  published: boolean;
  featured: boolean;
  category_id: number | null;
  view_count: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
};

// 完整的文章类型（包含分类和标签）
export type PostWithDetails = Post & {
  category: Category | null;
  tags: Tag[];
};
