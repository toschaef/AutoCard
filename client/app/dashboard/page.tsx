// app/dashboard/page.tsx
'use client';

/*
 * Dashboard (LOOKS only — logic & routes unchanged)
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '../../components/TopBar';
import Row from '../../components/Row';
import CreateSetModal from '../../components/CreateSetModal';
import { yourSets, exampleSets } from '../../lib/exampleSets';
import apiClient from '../../apiClient';
import { useAppContext } from '@/Context';

export default function DashboardPage() {
  const { user } = useAppContext();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Redirect to welcome page if not logged in (unchanged)
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  // Filter sets based on current user (unchanged)
  const getUserSets = () => {
    if (!user) return [];
    return yourSets.filter(set => set.userId === user.id);
  };

  const getRecentSets = () => {
    if (!user) return [];
    return yourSets.filter(set => set.userId === user.id);
  };

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
    <div
      className="min-h-screen flex flex-col dashTheme"
      style={{
        backgroundColor: 'var(--cream)',
        fontFamily:
          'ui-sans-serif, system-ui, "Inter", "Source Sans 3", Arial, sans-serif',
        color: 'var(--green)',
      }}
    >
      {/* Theme variables + strong focus ring — matches welcome page */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root{
              --green:#283618; --olive:#606c38; --cream:#fefae0; --amber:#dda15e; --burnt:#bc6c25;
            }
            .focus-strong:focus-visible{
              outline:none; box-shadow:0 0 0 2px var(--amber), 0 0 0 6px var(--cream);
            }
            .panel{
              background:
                radial-gradient(60vmax 40vmax at 90% -10%, color-mix(in oklab, var(--amber) 12%, white 88%) 0%, transparent 60%),
                linear-gradient(180deg,
                  color-mix(in oklab, var(--cream) 96%, white 4%) 0%,
                  color-mix(in oklab, var(--cream) 90%, var(--olive) 10%) 100%
                );
              border: 1px solid color-mix(in oklab, var(--olive) 20%, white 80%);
            }
            .badge{
              background:
                linear-gradient(180deg,
                  color-mix(in oklab, var(--olive) 78%, black 0%) 0%,
                  color-mix(in oklab, var(--olive) 60%, white 40%) 100%);
              color: var(--cream);
              border: 1px solid color-mix(in oklab, var(--olive) 50%, white 50%);
            }
          `,
        }}
      />

      {/* Top bar (unchanged component) */}
      <TopBar />

      {/* THEMED HERO (layout-only; no logic changed) */}
      <header className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-8 pb-2">
          <div className="grid items-end gap-6 md:grid-cols-[2fr,1fr]">
            {/* Left: lock-in headline */}
            <div>
              <h1
                className="font-extrabold tracking-tight leading-tight"
                style={{
                  fontFamily:
                    'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
                  fontSize: 'clamp(1.8rem, 4.6vw, 3.2rem)',
                  background:
                    'linear-gradient(90deg, var(--green) 0%, color-mix(in oklab, var(--green) 55%, var(--olive) 45%) 45%, var(--olive) 100%)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Lock in, {firstName}.
              </h1>
              <p className="mt-2 text-sm md:text-base" style={{ color: 'var(--olive)' }}>
                Pick up where you left off or start a new one.
              </p>
            </div>

            {/* Right: primary action */}
            <div className="flex md:justify-end">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="focus-strong rounded-xl px-5 py-2 font-semibold shadow transition hover:brightness-[1.02] active:brightness-95"
                style={{
                  backgroundColor: 'var(--green)',
                  color: 'var(--cream)',
                  border: '1px solid var(--green)',
                }}
              >
                New set
              </button>
            </div>
          </div>
        </div>

        {/* Subtle amber haze (like welcome hero) */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-8vw] top-6"
          style={{
            width: '46vmin',
            height: '46vmin',
            filter: 'blur(28px)',
            opacity: 0.28,
            background:
              'radial-gradient(40vmin 40vmin at 70% 50%, color-mix(in oklab, var(--amber) 12%, white 88%), transparent 65%)',
          }}
        />
      </header>

      {/* CONTENT PANELS — same order/props as your original code */}
      <main className="max-w-7xl mx-auto px-6 pb-16 space-y-10">
        <section className="panel rounded-3xl p-6 md:p-8 shadow-sm">
          <Row title="Your Sets" items={userSetsList} />
        </section>

        <section className="panel rounded-3xl p-6 md:p-8 shadow-sm">
          <Row title="Example Sets" items={exampleSets} />
        </section>
      </main>

      {/* Modal (unchanged) */}
      <CreateSetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateSet={handleCreateSet}
      />
    </div>
  );
}
