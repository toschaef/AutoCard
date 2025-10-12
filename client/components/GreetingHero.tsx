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
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-br from-slate-900 via-slate-700 to-sky-700 bg-clip-text text-transparent">
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
        {/* Grounded, subtle gradient on the name only */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-br from-slate-900 via-slate-700 to-sky-700 bg-clip-text text-transparent">
          {user.name}
        </h1>

        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          Welcome back to your learning dashboard. Continue your journey with your card sets.
        </p>

        {/* Grounded gradient for button */}
        <button
          onClick={onCreateSetClick}
          className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white
                     bg-gradient-to-r from-slate-900 via-slate-800 to-sky-700
                     hover:from-slate-900 hover:via-slate-800 hover:to-sky-800
                     transition-all transform hover:scale-[1.03] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
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
