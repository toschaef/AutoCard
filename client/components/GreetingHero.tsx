'use client';

import { useAuth } from '@/lib/auth';

interface GreetingHeroProps {
  onCreateSetClick: () => void;
}

export default function GreetingHero({ onCreateSetClick }: GreetingHeroProps) {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold gradient-text mb-6">
            Welcome
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Please log in to access your learning dashboard.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold gradient-text mb-6">
          Hello, {user.name}
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          Welcome back to your learning dashboard. Continue your journey with your card sets.
        </p>
        
        {/* Create Set Button */}
        <button
          onClick={onCreateSetClick}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Set
        </button>
      </div>
    </section>
  );
}
