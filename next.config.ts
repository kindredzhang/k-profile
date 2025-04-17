import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ], // 允许从Unsplash加载图片
  },
  // 配置字体加载
  async headers() {
    return [
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // 配置域名重定向规则
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.kindred.blog',
          },
        ],
        destination: 'https://kindred.blog/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'kindred.blog',
          },
        ],
        missing: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'https',
          },
        ],
        destination: 'https://kindred.blog/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
