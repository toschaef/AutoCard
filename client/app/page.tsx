
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
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-[#283618] sm:text-5xl md:text-6xl">
                  <span className="block xl:inline text-[#606c38]">
                    Learn Like Grandma
                  </span>{' '}
                  <span className="block xl:inline text-[#bc6c25]">
                    Used to Teach
                  </span>
                </h1>
                <p className="mt-3 text-base text-[#283618] sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Create beautiful flash cards the old-fashioned way. No fancy algorithms, 
                  just good old-fashioned learning that sticks. Perfect for studying at the kitchen table.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow-lg">
                    <a
                      href="#login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#fefae0] bg-[#606c38] hover:bg-[#283618] md:py-4 md:text-lg md:px-10 transition-all transform hover:scale-105"
                    >
                      Start Learning
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#features"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#283618] bg-[#dda15e] hover:bg-[#bc6c25] md:py-4 md:text-lg md:px-10 transition-colors"
                    >
                      See How It Works
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-gradient-to-r from-[#606c38] to-[#dda15e] sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <div className="text-center text-[#fefae0]">
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-2xl font-bold mb-2">Simple & Effective</h3>
              <p className="text-lg opacity-90">Just like grandma&apos;s recipes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-[#fefae0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#283618] sm:text-4xl">
              Why We&apos;re Different
            </h2>
            <p className="mt-4 text-lg text-[#283618]">
              No complicated tech, just good old-fashioned learning
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#606c38] text-[#fefae0] mx-auto">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-[#283618]">Handcrafted Cards</h3>
              <p className="mt-2 text-base text-[#283618]">
                Create your own flash cards with care, just like writing in a notebook.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#dda15e] text-[#fefae0] mx-auto">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-[#283618]">Track Your Journey</h3>
              <p className="mt-2 text-base text-[#283618]">
                See how much you've learned, like checking off items on grandma's grocery list.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#bc6c25] text-[#fefae0] mx-auto">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-[#283618]">Study with Heart</h3>
              <p className="mt-2 text-base text-[#283618]">
                Learn at your own pace, in your own way, just like grandma taught us.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div id="login" className="py-16 bg-[#dda15e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#fefae0] sm:text-4xl">
              Ready to Start Learning?
            </h2>
            <p className="mt-4 text-lg text-[#fefae0]">
              Sign in to create your first set of flash cards
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#283618]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-[#fefae0] mb-4">
              Grandma's Flash Cards
            </h3>
            <p className="text-[#dda15e]">
              Learning made simple, just like grandma used to do
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
