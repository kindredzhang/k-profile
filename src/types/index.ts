
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

// Simple Photo type for local photos
export type LocalPhoto = {
    id: string;
    src: string;
    alt: string;
    date: string;
    location?: string;
    description?: string;
    tags?: string[];
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
    excerpt?: string;
    tags?: string[];
    category?: string;
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
