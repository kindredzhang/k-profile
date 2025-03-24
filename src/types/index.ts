// 获取文章类型定义
export type Post = {
    id: number;
    slug: string;
    title: string;
    date: string;
    author: string;
    description: string | null;
    content: string;
    view_count: number;
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

export type Photo = {
    id: number;
    title: string | null;
    description: string | null;
    url: string;
    created_at: string;
    updated_at: string;
};

// 完整的文章类型（包含分类和标签）
export type PostWithDetails = Post & {
    category: Category | null;
    tags: Tag[];
};
