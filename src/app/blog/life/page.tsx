import BlogLayout from '@/components/blog/BlogLayout';

// 模拟演讲数据
const talks = [
  {
    id: 'talk-1',
    title: 'Async, Sync, in Between',
    date: 'Mar 3',
    duration: '18min',
    link: '#'
  },
  {
    id: 'talk-2',
    title: 'Move on to ESM-only',
    date: 'Feb 5',
    duration: '15min',
    link: '#'
  },
  {
    id: 'talk-3',
    title: 'Epoch Semantic Versioning',
    date: 'Jan 7',
    duration: '8min',
    link: '#'
  },
  {
    id: 'talk-4',
    title: 'Introducing Nuxt Icon v1',
    date: 'Nov 28',
    duration: '20min',
    link: '#'
  },
  {
    id: 'talk-5',
    title: 'Initiative on Sponsorship Forwarding',
    date: 'Apr 20',
    duration: '10min',
    link: '#'
  }
];

export default function Life() {
  return (
    <BlogLayout title="Life">
      <h1 className="text-6xl font-bold mb-8">2025</h1>
      
      <div className="space-y-6">
        {talks.map((talk) => (
          <div key={talk.id} className="group">
            <a href={talk.link} className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-border">
              <div className="flex-1">
                <h2 className="text-xl font-medium group-hover:text-primary transition-colors">{talk.title}</h2>
              </div>
              <div className="flex items-center space-x-4 text-muted-foreground text-sm mt-2 md:mt-0">
                <span>{talk.date}</span>
                <span>·</span>
                <span>{talk.duration}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
      
      <h1 className="text-6xl font-bold mb-8 mt-16">2024</h1>
      
      <div className="space-y-6">
        {talks.slice(0, 3).map((talk) => (
          <div key={`past-${talk.id}`} className="group">
            <a href={talk.link} className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-border">
              <div className="flex-1">
                <h2 className="text-xl font-medium group-hover:text-primary transition-colors">{talk.title}</h2>
              </div>
              <div className="flex items-center space-x-4 text-muted-foreground text-sm mt-2 md:mt-0">
                <span>{talk.date}</span>
                <span>·</span>
                <span>{talk.duration}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </BlogLayout>
  );
}
