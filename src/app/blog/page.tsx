import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/mdx';

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">博客文章</h1>
          
          {posts.length > 0 ? (
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.id} className="border-b border-border pb-8">
                  <Link 
                    href={`/posts/${post.id}`}
                    className="block group"
                  >
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    {post.description && (
                      <p className="text-foreground">{post.description}</p>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">暂无博客文章</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
