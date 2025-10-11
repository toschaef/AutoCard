'use client';

/*
 * Quick Start:
 * 1. Install Tailwind CSS: npm install -D tailwindcss postcss autoprefixer
 * 2. Run development server: npm run dev
 * 3. Navigate to /dashboard
 * 
 * TODO: Add navigation routing for Play/Edit buttons
 */

import TopBar from '../../components/TopBar';
import GreetingHero from '../../components/GreetingHero';
import Row from '../../components/Row';
import { yourSets, recentSets, draftSets } from '../../lib/mockData';
import { useAuth } from '../../lib/auth';

export default function DashboardPage() {
  const { user } = useAuth();

  // Filter sets based on current user
  const getUserSets = () => {
    if (!user) return [];
    return yourSets.filter(set => set.userId === user.id);
  };

  const getRecentSets = () => {
    if (!user) return [];
    return recentSets.filter(set => set.userId === user.id);
  };

  const getDraftSets = () => {
    if (!user) return [];
    return draftSets.filter(set => set.userId === user.id);
  };

  const filteredRows = [
    { title: "Your Sets", items: getUserSets() },
    { title: "Recent", items: getRecentSets() },
    { title: "Drafts", items: getDraftSets() },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar />
      <GreetingHero />
      
      <main className="max-w-7xl mx-auto">
        {filteredRows.map((row) => (
          <Row
            key={row.title}
            title={row.title}
            items={row.items}
          />
        ))}
      </main>
    </div>
  );
}
