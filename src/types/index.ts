
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
    file_name?: string;
    category?: string | null;
    tags?: string[];
    is_featured?: boolean;
    created_at: string;
    updated_at: string;
};

// User for admin authentication
export type User = {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
};

// Post

export type StarPost = {
    id: string;
    title: string;
    date: string;
    url?: string;
}

export type ListPost = StarPost & {
    reading_time: string;
}

export type DetailPost = StarPost & {
    content: string;
    view_count: number;
    reading_time: string;
}

// Projects
export type Project = {
    id: number;
    title: string;
    description: string | null;
    url: string;
    tags: string[];
    is_featured: boolean;
}
