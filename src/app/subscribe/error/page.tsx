import Layout from '@/components/layout/Layout';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Subscription Error | Kindred',
  description: 'There was an error with your subscription to Kindred\'s newsletter.',
};

// @ts-ignore - Next.js page props type issue
export default function SubscriptionErrorPage({ searchParams }: any) {
  const errorMessage = searchParams?.message || 'An unknown error occurred';

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Subscription Error</h1>
          <p className="text-lg text-muted-foreground mb-8">
            {errorMessage}
          </p>
          <Link 
            href="/"
            className="inline-flex items-center px-5 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </Layout>
  );
}
