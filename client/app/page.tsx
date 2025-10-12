
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import LoginForm from '@/components/LoginForm';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fefae0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#606c38] mx-auto mb-4"></div>
          <p className="text-[#283618]">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is logged in, they'll be redirected, but show loading in the meantime
  if (user) {
    return (
      <div className="min-h-screen bg-[#fefae0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#606c38] mx-auto mb-4"></div>
          <p className="text-[#283618]">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fefae0]">
      
    </div>
  );
}
