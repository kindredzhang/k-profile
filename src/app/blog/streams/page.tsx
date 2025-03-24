import { ExternalLinkIcon, VideoIcon } from "@/components/ui/icons";
import BlogLayout from "@/components/blog/BlogLayout";
import Link from "next/link";
import { getAllCategories } from "@/lib/db";

// 模拟视频数据
const videos = [
  {
    id: "video-1",
    title: "React 状态管理最佳实践",
    date: "2025-03-10",
    duration: "32:15",
    platform: "bilibili",
    link: "https://www.bilibili.com",
    thumbnailUrl: "/images/placeholder-video-1.jpg"
  },
  {
    id: "video-2",
    title: "TypeScript 高级类型系统详解",
    date: "2025-02-21",
    duration: "45:30",
    platform: "youtube",
    link: "https://www.youtube.com",
    thumbnailUrl: "/images/placeholder-video-2.jpg"
  },
  {
    id: "video-3",
    title: "构建高性能 Next.js 应用",
    date: "2025-01-15",
    duration: "28:45",
    platform: "bilibili",
    link: "https://www.bilibili.com",
    thumbnailUrl: "/images/placeholder-video-3.jpg"
  }
];

const platformLinks = [
  {
    name: "Bilibili",
    link: "https://space.bilibili.com/", // 替换为您的哔哩哔哩用户空间链接
    color: "bg-[#fb7299]"
  },
  {
    name: "YouTube",
    link: "https://www.youtube.com/channel/", // 替换为您的YouTube频道链接
    color: "bg-[#ff0000]"
  }
];

export default async function Streams() {
  const categories = await getAllCategories();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <BlogLayout categories={categories} activeCategory="streams" title="Video Streams">
      {/* 视频平台链接 */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3 text-muted-foreground">我的视频平台</h2>
        <div className="flex flex-wrap gap-3">
          {platformLinks.map((platform) => (
            <a 
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${platform.color} text-white hover:opacity-90 transition-opacity`}
            >
              <span>{platform.name}</span>
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      {/* 视频列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="group bg-card/30 rounded-lg overflow-hidden border border-border/30 hover:border-primary/30 transition-all duration-300">
            <div className="aspect-video relative bg-accent/10 flex items-center justify-center">
              {/* 视频缩略图这里使用了一个占位背景 */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary/5 to-secondary/5">
                <VideoIcon className="h-12 w-12 text-primary/20 group-hover:text-primary/40 transition-colors" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-sm">
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-medium group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <span className={`text-xs px-1.5 py-0.5 rounded ${video.platform === 'bilibili' ? 'bg-[#fb7299]/10 text-[#fb7299]' : 'bg-[#ff0000]/10 text-[#ff0000]'}`}>
                  {video.platform === 'bilibili' ? 'Bilibili' : 'YouTube'}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDate(video.date)}
              </div>
              <div className="mt-3">
                <a 
                  href={video.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs flex items-center gap-1 text-primary/70 hover:text-primary transition-colors"
                >
                  观看视频 <ExternalLinkIcon className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </BlogLayout>
  );
}