import Layout from '@/components/layout/Layout';

// 模拟赞助商数据
const sponsors = [
  {
    id: 'sponsor-1',
    name: 'Vercel',
    tier: 'Platinum',
    logo: '/placeholder-logo.svg',
    link: 'https://vercel.com'
  },
  {
    id: 'sponsor-2',
    name: 'Netlify',
    tier: 'Gold',
    logo: '/placeholder-logo.svg',
    link: 'https://netlify.com'
  },
  {
    id: 'sponsor-3',
    name: 'Digital Ocean',
    tier: 'Gold',
    logo: '/placeholder-logo.svg',
    link: 'https://digitalocean.com'
  },
  {
    id: 'sponsor-4',
    name: 'GitHub',
    tier: 'Silver',
    logo: '/placeholder-logo.svg',
    link: 'https://github.com'
  },
  {
    id: 'sponsor-5',
    name: 'Tailwind Labs',
    tier: 'Silver',
    logo: '/placeholder-logo.svg',
    link: 'https://tailwindcss.com'
  }
];

export default function SponsorsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Sponsors</h1>
          
          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-xl text-muted-foreground">
              Your support enables me to create and maintain open source projects, write blog posts, and share knowledge with the community.
              If you find value in my work, please consider becoming a sponsor.
            </p>
            
            {/* <div className="mt-8">
              <a 
                href="https://github.com/sponsors/kindred" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              >
                Become a Sponsor
              </a>
            </div> */}
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Platinum Sponsors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {sponsors
              .filter(sponsor => sponsor.tier === 'Platinum')
              .map(sponsor => (
                <a 
                  key={sponsor.id}
                  href={sponsor.link}
                  className="flex items-center p-6 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center mr-4">
                    <span className="text-xl font-bold">{sponsor.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{sponsor.name}</h3>
                    <p className="text-muted-foreground">{sponsor.tier}</p>
                  </div>
                </a>
              ))}
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Gold Sponsors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {sponsors
              .filter(sponsor => sponsor.tier === 'Gold')
              .map(sponsor => (
                <a 
                  key={sponsor.id}
                  href={sponsor.link}
                  className="flex items-center p-6 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center mr-4">
                    <span className="text-xl font-bold">{sponsor.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{sponsor.name}</h3>
                    <p className="text-muted-foreground">{sponsor.tier}</p>
                  </div>
                </a>
              ))}
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Silver Sponsors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sponsors
              .filter(sponsor => sponsor.tier === 'Silver')
              .map(sponsor => (
                <a 
                  key={sponsor.id}
                  href={sponsor.link}
                  className="flex items-center p-6 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center mr-4">
                    <span className="text-xl font-bold">{sponsor.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{sponsor.name}</h3>
                    <p className="text-muted-foreground">{sponsor.tier}</p>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
