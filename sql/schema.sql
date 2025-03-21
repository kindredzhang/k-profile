-- PostgreSQL数据库模式设计用于博客系统

-- 文章分类表
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 标签表
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 文章表
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- 文章与标签的多对多关系表
CREATE TABLE post_tags (
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- 添加自动更新updated_at字段的触发器
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_posts_modtime
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_categories_modtime
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_tags_modtime
BEFORE UPDATE ON tags
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- 添加用于全文搜索的索引
ALTER TABLE posts ADD COLUMN search_vector tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('chinese', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('chinese', coalesce(description, '')), 'B') ||
  setweight(to_tsvector('chinese', coalesce(content, '')), 'C')
) STORED;

CREATE INDEX posts_search_idx ON posts USING GIN (search_vector);
