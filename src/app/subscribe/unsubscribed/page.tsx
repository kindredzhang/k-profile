import Link from 'next/link';

export const metadata = {
  title: 'Unsubscribed | Kindred',
  description: 'You have been unsubscribed from Kindred\'s newsletter.',
};

export default function UnsubscribedPage() {
  return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Successfully Unsubscribed</h1>
          <p className="text-lg text-muted-foreground mb-8">
            You have been successfully unsubscribed from Kindred's newsletter. You will no longer receive emails from us.
          </p>
          <p className="text-muted-foreground mb-8">
            Changed your mind? You can always subscribe again from the homepage.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center px-5 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
  );
}
