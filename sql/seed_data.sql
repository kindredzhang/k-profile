-- 插入测试数据

-- 插入文章分类
INSERT INTO categories (name, slug, description) VALUES
('Blog', 'blog', '个人博客文章和技术分享'),
('Talks', 'talks', '演讲和技术讲座内容'),
('Podcasts', 'podcasts', '播客内容和访谈'),
('Streams', 'streams', '直播和视频流内容'),
('Notes', 'notes', '短笔记和想法');

-- 插入标签
INSERT INTO tags (name, slug) VALUES
('JavaScript', 'javascript'),
('React', 'react'),
('NextJS', 'nextjs'),
('CSS', 'css'),
('设计', 'design'),
('TypeScript', 'typescript'),
('前端', 'frontend'),
('后端', 'backend'),
('全栈', 'fullstack'),
('UI/UX', 'ui-ux'),
('性能优化', 'performance');

-- 插入文章
INSERT INTO posts (slug, title, description, content, published, featured, category_id, published_at) VALUES
-- Blog文章
('welcome-to-my-blog', '欢迎来到我的博客', '这是我的第一篇博客文章，介绍了我创建这个平台的初衷。', '# 欢迎来到我的博客\n\n感谢您访问我的个人网站！这个空间将用于分享我对技术的思考、项目经验以及学习心得。\n\n## 为什么创建这个博客\n\n在信息爆炸的时代，我希望有一个属于自己的角落，可以系统性地整理和分享知识。这不仅是一种输出，也是一种促进自我成长的方式。\n\n## 期待什么内容\n\n这里将会涵盖前端开发、React生态、性能优化等多方面的内容。我也会分享一些工作中遇到的问题及解决方案。\n\n期待与你在技术的道路上共同成长！', TRUE, TRUE, 1, NOW() - INTERVAL '2 days'),

('understanding-react-hooks', 'React Hooks深入理解', '探索React Hooks的工作原理和最佳实践', '# React Hooks深入理解\n\n自React 16.8引入Hooks以来，函数组件的能力得到了极大的提升。本文将深入探讨React Hooks的工作原理和使用技巧。\n\n## useState的内部实现\n\n`useState`是最基础的Hook，它允许函数组件拥有状态。其内部实现基于一个链表结构...\n\n## useEffect的生命周期\n\n`useEffect`用于处理副作用，它实际上统一了class组件中的多个生命周期方法...\n\n## 自定义Hook\n\n创建自定义Hook是提高代码复用性的绝佳方式。下面是一个获取窗口大小的自定义Hook示例：\n\n```jsx\nfunction useWindowSize() {\n  const [size, setSize] = useState({ width: 0, height: 0 });\n  \n  useEffect(() => {\n    const handleResize = () => {\n      setSize({ width: window.innerWidth, height: window.innerHeight });\n    };\n    \n    window.addEventListener(\"resize\", handleResize);\n    handleResize();\n    \n    return () => window.removeEventListener(\"resize\", handleResize);\n  }, []);\n  \n  return size;\n}\n```\n\n## 结论\n\nHooks为React组件开发带来了更简洁、更灵活的方式。通过理解其工作原理，我们可以更好地发挥其威力，编写出更优雅的React应用。', TRUE, FALSE, 1, NOW() - INTERVAL '10 days'),

('css-modern-layout-techniques', '现代CSS布局技术详解', '探索Grid、Flexbox和新兴的CSS布局技术', '# 现代CSS布局技术详解\n\n随着浏览器支持的提升，现代CSS布局技术已经变得越来越强大。本文将详细介绍Grid、Flexbox以及其他新兴布局技术。\n\n## CSS Grid布局\n\nCSS Grid是一个二维布局系统，专为解决复杂布局问题而设计。以下是一个基本的Grid布局示例：\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 20px;\n}\n```\n\n## Flexbox布局\n\nFlexbox是一个一维布局系统，特别适合处理行或列的布局。以下是一个基本的Flexbox示例：\n\n```css\n.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n```\n\n## CSS容器查询\n\n容器查询是一个令人兴奋的新特性，它允许基于父容器尺寸而非视口尺寸来应用样式：\n\n```css\n@container (min-width: 400px) {\n  .card {\n    display: grid;\n    grid-template-columns: 1fr 2fr;\n  }\n}\n```\n\n## 结论\n\n现代CSS布局技术使我们能够创建更加灵活和响应式的布局，大大减少了对JavaScript的依赖。掌握这些技术对于每个前端开发者来说都是必不可少的。', TRUE, FALSE, 1, NOW() - INTERVAL '15 days'),

-- Talks文章
('conference-talk-nextjs-performance', 'NextJS性能优化策略', 'React大会上关于NextJS应用性能优化的演讲记录', '# NextJS性能优化策略\n\n这是我在上海React开发者大会上的演讲内容整理，主题是NextJS应用的性能优化。\n\n## 服务器组件与客户端组件\n\nNextJS 13引入的React Server Components彻底改变了我们构建应用的方式。服务器组件允许我们直接在服务器上渲染组件，减少了向客户端发送的JavaScript量...\n\n## 图像优化\n\nNextJS的Image组件提供了强大的图像优化功能，但使用不当会导致性能问题。以下是一些优化技巧：\n\n- 合理设置sizes属性\n- 使用适当的priority策略\n- 实现懒加载\n\n## 路由预加载\n\n利用NextJS的预加载功能可以显著提升用户体验：\n\n```jsx\nimport { useRouter } from \"next/router\";\n\nfunction MyLink({ href, children }) {\n  const router = useRouter();\n  \n  return (\n    <a \n      href={href}\n      onClick={(e) => {\n        e.preventDefault();\n        router.push(href);\n      }}\n      onMouseEnter={() => router.prefetch(href)}\n    >\n      {children}\n    </a>\n  );\n}\n```\n\n## 演讲幻灯片\n\n[下载演讲幻灯片PDF](/talks/nextjs-performance.pdf)\n\n## Q&A环节\n\n以下是演讲后观众提出的一些问题及我的回答...\n', TRUE, FALSE, 2, NOW() - INTERVAL '30 days'),

-- Podcasts文章
('podcast-frontend-future', '前端开发的未来趋势', '与技术专家讨论前端开发未来五年的发展方向', '# 前端开发的未来趋势\n\n在这期播客中，我邀请了三位资深前端专家一起讨论前端开发未来五年的发展趋势。\n\n## 嘉宾介绍\n\n- 张三：某大型科技公司前端架构师，React核心团队成员\n- 李四：知名前端框架作者，拥有10年Web开发经验\n- 王五：专注于Web性能优化的技术专家\n\n## 讨论要点\n\n### WebAssembly的崛起\n\n张三认为WebAssembly将在未来五年内得到广泛应用，特别是在性能敏感的领域...\n\n### AI辅助编程\n\n李四分享了他使用GitHub Copilot的经验，并探讨了AI如何改变前端开发工作流...\n\n### Web组件标准\n\n王五对Web组件标准的未来持乐观态度，他认为随着浏览器支持的提升，我们将看到更多框架无关的组件库...\n\n## 收听方式\n\n- [Apple Podcasts](https://example.com/podcast)\n- [Spotify](https://example.com/podcast)\n- [YouTube](https://example.com/podcast)\n\n## 节目笔记\n\n00:00 - 开场白\n05:32 - WebAssembly讨论\n15:45 - AI辅助编程\n28:10 - Web组件标准\n40:22 - 结束语', TRUE, FALSE, 3, NOW() - INTERVAL '45 days'),

-- Streams文章
('livestream-typescript-tips', 'TypeScript高级技巧直播回顾', '直播中分享的TypeScript类型编程和工程化实践', '# TypeScript高级技巧直播回顾\n\n感谢大家参与我的TypeScript高级技巧直播！这篇文章整理了直播中分享的关键内容。\n\n## 类型编程基础\n\n在直播中，我们首先探讨了TypeScript中的类型编程基础，包括：\n\n- 泛型的高级应用\n- 条件类型的使用\n- 映射类型与索引访问\n\n```typescript\ntype ExtractProps<T> = T extends React.ComponentType<infer P> ? P : never;\n\ntype ButtonProps = ExtractProps<typeof Button>;\n```\n\n## 工程化实践\n\n接下来，我分享了在大型项目中TypeScript的工程化实践：\n\n- 项目配置优化\n- 类型声明管理\n- 与ESLint的集成\n\n## 性能优化\n\n针对TypeScript编译性能，我们讨论了以下优化策略：\n\n- 项目结构优化\n- tsconfig配置调整\n- 增量编译的应用\n\n## 直播回放\n\n如果你错过了直播，可以在[我的B站频道](https://example.com/bilibili)观看回放。\n\n## 示例代码\n\n直播中演示的所有代码都已上传到[GitHub仓库](https://github.com/example/typescript-tips)。', TRUE, FALSE, 4, NOW() - INTERVAL '60 days'),

-- Notes文章
('quick-note-css-variables', 'CSS变量使用技巧', '快速笔记：CSS变量在主题切换中的应用', '# CSS变量使用技巧\n\n今天在项目中实现暗黑模式时，发现CSS变量（自定义属性）非常强大，记录一下使用技巧。\n\n## 基本设置\n\n在`:root`选择器中定义全局CSS变量：\n\n```css\n:root {\n  --primary-color: #3490dc;\n  --secondary-color: #38c172;\n  --text-color: #2d3748;\n  --background-color: #ffffff;\n}\n\n.dark-theme {\n  --primary-color: #90cdf4;\n  --secondary-color: #9ae6b4;\n  --text-color: #e2e8f0;\n  --background-color: #1a202c;\n}\n```\n\n## JavaScript中操作CSS变量\n\n```javascript\n// 获取CSS变量值\ngetComputedStyle(document.documentElement).getPropertyValue(\"--primary-color\");\n\n// 设置CSS变量值\ndocument.documentElement.style.setProperty(\"--primary-color\", \"#ff0000\");\n```\n\n## 与媒体查询结合\n\n```css\n:root {\n  --font-size-base: 16px;\n}\n\n@media (min-width: 768px) {\n  :root {\n    --font-size-base: 18px;\n  }\n}\n```\n\n这种方式比传统的主题切换方法要灵活得多，不需要加载额外的CSS文件，也不需要替换大量类名。', TRUE, FALSE, 5, NOW() - INTERVAL '5 days');

-- 插入文章标签关系
INSERT INTO post_tags (post_id, tag_id) VALUES
(1, 1), -- welcome-to-my-blog: JavaScript
(1, 3), -- welcome-to-my-blog: NextJS
(2, 1), -- understanding-react-hooks: JavaScript
(2, 2), -- understanding-react-hooks: React
(3, 4), -- css-modern-layout-techniques: CSS
(3, 5), -- css-modern-layout-techniques: 设计
(3, 10), -- css-modern-layout-techniques: UI/UX
(4, 3), -- conference-talk-nextjs-performance: NextJS
(4, 11), -- conference-talk-nextjs-performance: 性能优化
(5, 7), -- podcast-frontend-future: 前端
(5, 9), -- podcast-frontend-future: 全栈
(6, 6), -- livestream-typescript-tips: TypeScript
(6, 7), -- livestream-typescript-tips: 前端
(7, 4), -- quick-note-css-variables: CSS
(7, 5); -- quick-note-css-variables: 设计
