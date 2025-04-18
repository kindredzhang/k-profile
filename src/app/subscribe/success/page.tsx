import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export const metadata = {
  title: 'Subscription Confirmed | Kindred',
  description: 'Your subscription to Kindred\'s newsletter has been confirmed.',
};

export default function SubscriptionSuccessPage() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Subscription Confirmed!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for confirming your subscription to Kindred's newsletter. You'll now receive updates about new articles, projects, and more.
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
