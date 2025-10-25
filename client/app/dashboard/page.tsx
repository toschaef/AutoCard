// app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import Row from './components/Row';
import CreateSetModal from './components/CreateSetModal';
import './page.css';
import { useAppContext } from '@/Context';

export default function DashboardPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user, sets } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">

      {/* HERO — flowing gradient, cohesive with Welcome (visual only) */}
      <header className="relative no-x">
        <div className="mx-auto max-w-7xl px-6 pt-8 pb-2">
          <div className="hero-card animate-gradient-flow ease-entry p-6 sm:p-8">
            <div className="grid items-end gap-6 md:grid-cols-[2fr,1fr]">
              {/* Left: lock-in headline */}
              <div>
                <h1 className="font-extrabold tracking-tight leading-tight text-[clamp(1.9rem,4.8vw,3.2rem)] text-[color:var(--green)]">
                  {`Lock in, ${user?.name.split(' ')[0] || 'Bruh'}.`}
                </h1>
                <p className="mt-2 text-sm md:text-base text-[color:var(--olive)]">
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
            <h2 className="text-xl sm:text-4xl font-semibold text-[color:var(--green)]">
              Your Sets
            </h2>
          </div>

          {/* Display user's sets */}
          <Row items={sets} />
        </section>
      </main>

      {/* Modal */}
      <CreateSetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}