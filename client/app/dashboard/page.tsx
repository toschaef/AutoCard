'use client';

/*
 * Quick Start:
 * 1. Install Tailwind CSS: npm install -D tailwindcss postcss autoprefixer
 * 2. Run development server: npm run dev
 * 3. Navigate to /dashboard
 * 
 * TODO: Add navigation routing for Play/Edit buttons
 */

import { useState } from 'react';
import TopBar from '../../components/TopBar';
import GreetingHero from '../../components/GreetingHero';
import Row from '../../components/Row';
import CreateSetModal from '../../components/CreateSetModal';
import { yourSets, recentSets, draftSets } from '../../lib/mockData';
import { useAuth } from '../../lib/auth';

export default function DashboardPage() {
  const { user } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  const handleCreateSet = async (setData: { title: string; description: string }) => {
    // TODO: Implement actual set creation logic
    console.log('Creating set:', setData);
    
    // For now, just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: Add the new set to the user's sets and refresh the dashboard
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar />
      <GreetingHero onCreateSetClick={() => setIsCreateModalOpen(true)} />
      
      <main className="max-w-7xl mx-auto">
        {filteredRows.map((row) => (
          <Row
            key={row.title}
            title={row.title}
            items={row.items}
          />
        ))}
      </main>

      {/* Create Set Modal */}
      <CreateSetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateSet={handleCreateSet}
      />
    </div>
  );
}
