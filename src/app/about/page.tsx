import Layout from '@/components/layout/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">关于我</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p>
              你好，我是Kindred，一名热爱技术和创新的开发者。我专注于前端开发和用户体验设计，致力于创建美观且实用的数字产品。
            </p>
            
            <h2>技能</h2>
            <ul>
              <li>前端开发: React, Vue, Next.js</li>
              <li>UI/UX设计</li>
              <li>后端开发: Node.js, Express</li>
              <li>数据库: MongoDB, MySQL</li>
            </ul>
            
            <h2>经历</h2>
            <p>
              我有多年的Web开发经验，曾在多家公司担任前端开发工程师。在工作中，我负责设计和实现用户界面，优化网站性能，以及与后端团队协作开发完整的Web应用。
            </p>
            
            <h2>爱好</h2>
            <p>
              除了编程，我还喜欢阅读、旅行和摄影。我相信这些爱好帮助我保持创造力，并为我的技术工作提供灵感。
            </p>
            
            <h2>联系方式</h2>
            <p>
              如果你有任何问题或合作意向，欢迎通过以下方式联系我：
            </p>
            <ul>
              <li>Email: contact@example.com</li>
              <li>GitHub: <a href="https://github.com/kindred" target="_blank" rel="noopener noreferrer">github.com/kindred</a></li>
              <li>Twitter: <a href="https://twitter.com/kindred" target="_blank" rel="noopener noreferrer">twitter.com/kindred</a></li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
