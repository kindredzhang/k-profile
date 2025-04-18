'use client';

import { useState } from 'react';
import { SendIcon } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证邮箱
    if (!email || !email.includes('@')) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }
    
    setLoading(true);
    setMessage(null);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setMessage({ text: data.error || 'Subscription failed, please try again later.', type: 'error' });
        return;
      }
      
      setMessage({ text: data.message, type: 'success' });
      
      // 如果成功，清空输入框
      if (data.success) {
        setEmail('');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setMessage({ text: 'An error occurred during the subscription process.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 rounded-lg border border-primary/30 bg-primary/10 backdrop-blur-md transition-all duration-300 hover:backdrop-blur-xl hover:border-primary/40 shadow-sm hover:shadow-md enhanced-card">
      <h2 className="font-playfair text-lg font-bold mb-2 enhance-text flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        Subscribe to my newsletter
      </h2>
      <p className="text-sm text-muted-foreground mb-3">Get notified about new articles, projects and updates.</p>
      
      {message && (
        <div className={`mb-3 p-2 text-sm rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="flex-1 px-4 py-3 text-sm rounded-md border border-border bg-background/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background/90 transition-all duration-300 overflow-hidden"
        />
        <button 
          type="submit"
          disabled={loading}
          className="px-5 py-3 text-sm font-semibold rounded-md gradient-btn text-primary-foreground inline-flex items-center gap-2"
        >
          {loading ? 'Subscribing...' : (
            <>
              <SendIcon size={16} />
              Subscribe
            </>
          )}
        </button>
      </form>
    </div>
  );
}
