// app/dashboard/page.tsx
'use client';

/*
 * Dashboard (LOOKS only — logic & routes unchanged)
 * - No routing, links, handlers, data shape, or props are modified.
 * - Visual cohesion with Welcome page (colors, gradients, motion).
 * - Horizontal overflow removed.
 */

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '../../components/TopBar';
import Row from '../../components/Row';
import CreateSetModal from '../../components/CreateSetModal';
import { CardSet, User } from '@/types/types';
import './page.css';
import { useAppContext } from '@/Context';

export default function DashboardPage() {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user, sets } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">

      {/* Subtle site-wide decorative backdrop (does not affect layout or scroll) */}
      {/* <div className="page-backdrop">
        <div className="glow" />
      </div> */}

      {/* Top bar (unchanged component) */}
      <TopBar />

      {/* HERO — flowing gradient, cohesive with Welcome (visual only) */}
      <header className="relative no-x">
        <div className="mx-auto max-w-7xl px-6 pt-8 pb-2">
          <div className="hero-card animate-gradient-flow ease-entry p-6 sm:p-8">
            <div className="grid items-end gap-6 md:grid-cols-[2fr,1fr]">
              {/* Left: lock-in headline */}
              <div>
                <h1
                  className="font-extrabold tracking-tight leading-tight"
                  style={{
                    fontFamily:
                      'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
                    fontSize: 'clamp(1.9rem, 4.8vw, 3.2rem)',
                    letterSpacing: '-0.02em',
                    color: 'var(--fg)',
                  }}
                >
                  {`Lock in, ${user?.name.split(' ')[0] || 'Bruh'}.`}
                </h1>
                <p
                  className="mt-2 text-sm md:text-base"
                  style={{ color: 'var(--muted)' }}
                >
                  Pick up where you left off or start a new one.
                </p>
              </div>

              {/* Right: primary action (unchanged behavior) */}
              <div className="flex md:justify-end">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="btn btn-primary focus-strong hover:brightness-[1.03] active:brightness-95"
                >
                  + New set
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT PANELS — visual only; logic & props unchanged */}
      <main className="max-w-7xl mx-auto px-6 pb-16 space-y-10 w-full no-x">
        {/* Your Sets */}
        <section className="panel rounded-3xl p-6 md:p-8 shadow-sm w-full no-x">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2
              className="text-xl sm:text-4xl font-semibold"
              style={{ color: 'var(--fg)' }}
            >
              Your Sets
            </h2>
          </div>

          {/* Keep Row component untouched */}
          <Row items={sets} />
        </section>

        {/* Example Sets */}
        {/* <section className="panel rounded-3xl p-6 md:p-8 shadow-sm w-full no-x">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2
              className="text-xl sm:text-2xl font-semibold"
              style={{ color: 'var(--fg)' }}
            >
              Example Sets
            </h2>
          </div>

          <Row title="Example Sets" items={exampleSets} />
        </section> */}
      </main>

      {/* Modal (unchanged) */}
      <CreateSetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}