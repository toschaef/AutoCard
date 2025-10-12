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
//import { useAuth } from '../../lib/auth';
import apiClient from '../../apiClient';
import { useRouter } from 'next/navigation';


export default function DashboardPage() {
  const router = useRouter();
 // const { user } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter sets based on current user
  const getUserSets = () => {
    //
  };

  const getRecentSets = () => {
    //
  };

  const getDraftSets = () => {
    //
  };

  const filteredRows = [
    { title: "Your Sets", items: getUserSets() },
    { title: "Recent", items: getRecentSets() },
    { title: "Drafts", items: getDraftSets() },
  ];

  const handleCreateSet = async (setData: { topic, prompt, difficulty: 'novice' | 'intermediate' | 'advanced', cardCount }) => {
    try {
    console.log('Creating set:', setData);

    const { topic, prompt, difficulty } = setData;
    
    //const setId = await apiClient.post(//fix this);
    
    const res = await apiClient.post(`/api/sets/${setId}/cards/`, {topic, prompt, difficulty, cardCount});

    if (res.status === 200) { 


      router.push('/dashboard');
    } else {      console.error('Error creating set:');

    }

    } catch (error) {
      console.error('Error creating set:', error);
    }


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
