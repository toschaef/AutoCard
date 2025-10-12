// app/dashboard/page.tsx
'use client';

/*
 * Dashboard (LOOKS only — logic & routes unchanged)
 * - No routing, links, handlers, data shape, or props are modified.
 * - Visual cohesion with Welcome page (colors, gradients, motion).
 * - Horizontal overflow removed.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '../../components/TopBar';
import Row from '../../components/Row';
import CreateSetModal from '../../components/CreateSetModal';
import { yourSets, exampleSets } from '../../lib/exampleSets';
import { useAuth } from '../../lib/auth';
import { CardSet } from '../../lib/types';

export default function DashboardPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [userCreatedSets, setUserCreatedSets] = useState<CardSet[]>([]);

  // Auto-login for testing (comment out later)
  useEffect(() => {
    if (!user) {
      // Auto-login as Ali for testing
      login('ali@example.com', 'password').catch(console.error);
    }
  }, [user, login]);

  // Load user-created sets from localStorage
  useEffect(() => {
    if (!user) return;
    
    const loadedSets: CardSet[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('temp-set-')) {
        try {
          const setData = localStorage.getItem(key);
          if (setData) {
            const parsed = JSON.parse(setData);
            if (parsed.userId === user.id) {
              loadedSets.push({
                ...parsed,
                created: new Date(parsed.created)
              });
            }
          }
        } catch (error) {
          console.error('Error loading set:', error);
        }
      }
    }
    setUserCreatedSets(loadedSets);
  }, [user]); // Load on mount and when user changes

  // Reload sets when returning from edit page
  useEffect(() => {
    const handleFocus = () => {
      if (!user) return;
      
      const loadedSets: CardSet[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('temp-set-')) {
          try {
            const setData = localStorage.getItem(key);
            if (setData) {
              const parsed = JSON.parse(setData);
              if (parsed.userId === user.id) {
                loadedSets.push({
                  ...parsed,
                  created: new Date(parsed.created)
                });
              }
            }
          } catch (error) {
            console.error('Error loading set:', error);
          }
        }
      }
      setUserCreatedSets(loadedSets);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [user]);

  // Filter sets based on current user (unchanged)
  const getUserSets = () => {
    if (!user) return [];
    const staticSets = yourSets.filter((set) => set.userId === user.id);
    return [...userCreatedSets, ...staticSets];
  };

  const handleCreateSet = async (setData: { title: string; description: string }) => {
    // Create new set with temporary ID
    const newSetId = `set-${Date.now()}`;
    
    // Store set data in localStorage temporarily
    const newSet = {
      id: newSetId,
      userId: user?.id || '1',
      title: setData.title,
      description: setData.description,
      cards: [],
      created: new Date()
    };
    
    localStorage.setItem(`temp-set-${newSetId}`, JSON.stringify(newSet));
    
    console.log('Creating set:', newSet);
    
    // Navigate to edit page for the new set
    router.push(`/set/${newSetId}/edit`);
  };

  const userSetsList = getUserSets();
  const firstName = user?.name?.split(' ')?.[0] ?? 'there';

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden"
      style={{
        // Cohesive page background (light cream like Welcome)
        backgroundColor: 'var(--bg)',
        fontFamily:
          'ui-sans-serif, system-ui, "Inter", "Source Sans 3", Arial, sans-serif',
        color: 'var(--fg)',
      }}
      data-theme="autocard"
    >
      {/* THEME + UTILITIES (presentational only) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* ---------- Color System (match Welcome) ---------- */
            :root{
              /* Surfaces */
              --bg:#fefae0;         /* cream page */
              --surface:#ffffff;    /* cards */
              --surface-2:#fbf7e6;  /* soft variant panel */

              /* Text */
              --fg:#283618;         /* deep green */
              --muted:#606c38;      /* olive */
              --muted-2:#7b8652;

              /* Accents */
              --accent:#283618;     /* primary action (deep green) */
              --accent-ink:#fefae0; /* text on accent */

              /* Borders & shadows */
              --line: color-mix(in oklab, var(--muted) 20%, white 80%);
              --shadow: 0 6px 16px rgba(16,24,40,0.06);

              /* Gradient (reused from Welcome) */
              --grad-from:#F9F6E7;
              --grad-via:#F4F0DE;
              --grad-to:#EDE7CF;
            }
            @media (prefers-color-scheme: dark){
              :root{
                --bg:#0e100b;
                --surface:#0f120d;
                --surface-2:#13170f;

                --fg:#e6eadd;
                --muted:#a1a98f;
                --muted-2:#b7bea4;

                --accent:#cfe6a4;
                --accent-ink:#0e100b;

                --line: rgba(255,255,255,0.1);
                --shadow: 0 10px 24px rgba(0,0,0,0.35);

                --grad-from:#1A1D15;
                --grad-via:#161910;
                --grad-to:#13160E;
              }
            }

            /* Clamp horizontal overflow globally */
            html, body { max-width: 100vw; overflow-x: hidden; }

            /* ---------- Motion Utilities (flowing gradient) ---------- */
            @media (prefers-reduced-motion: no-preference){
              .animate-gradient-flow { animation: gradient-flow 16s linear infinite; background-size:200% 200%; }
              .animate-gradient-flow-fast { animation: gradient-flow 8s linear infinite; background-size:200% 200%; }
              .ease-entry { transition: all 220ms ease-out; }
              .ease-exit  { transition: all 180ms ease-in; }
            }
            @media (prefers-reduced-motion: reduce){
              .animate-gradient-flow, .animate-gradient-flow-fast { animation:none; }
              .ease-entry, .ease-exit { transition:none; }
            }
            @keyframes gradient-flow{
              0%{background-position:0% 50%}
              50%{background-position:100% 50%}
              100%{background-position:0% 50%}
            }

            /* ---------- Components: Panels, Buttons, Focus ---------- */
            .panel{
              background:
                radial-gradient(60vmax 40vmax at 90% -10%, color-mix(in oklab, var(--muted) 10%, white 90%) 0%, transparent 60%),
                linear-gradient(180deg,
                  color-mix(in oklab, var(--surface-2) 96%, white 4%) 0%,
                  color-mix(in oklab, var(--surface-2) 92%, var(--muted) 8%) 100%);
              border: 1px solid var(--line);
              box-shadow: var(--shadow);
            }
            .focus-strong:focus-visible{
              outline:none;
              box-shadow:
                0 0 0 2px color-mix(in oklab, var(--accent) 65%, white 35%),
                0 0 0 6px color-mix(in oklab, var(--bg) 85%, white 15%);
              border-radius: 14px;
            }
            .btn{
              display:inline-flex; align-items:center; justify-content:center;
              font-weight:600; border-radius:12px; padding:10px 16px; line-height:1.2;
              border:1px solid transparent; cursor:pointer;
              transition: filter .18s ease, transform .18s ease;
            }
            .btn:active{ transform: translateY(1px); }
            .btn-primary{
              background-color: var(--accent);
              color: var(--accent-ink);
              border-color: var(--accent);
            }
            .btn-ghost{
              background: transparent;
              color: var(--fg);
              border-color: var(--line);
            }

            /* ---------- Hero card ---------- */
            .hero-card{
              background: linear-gradient(120deg, var(--grad-from), var(--grad-via), var(--grad-to));
              border: 1px solid var(--line);
              box-shadow: var(--shadow);
              border-radius: 24px;
            }

            /* ---------- Decorative page backdrop (subtle) ---------- */
            .page-backdrop{
              position: fixed; inset: 0; z-index: -1; pointer-events:none; overflow:hidden;
              mask-image: radial-gradient(120vmax 70vmax at 20% -10%, black 30%, transparent 70%);
            }
            .page-backdrop > .glow{
              position:absolute; top:-15vmax; left:-10vmax; width:80vmax; height:80vmax; filter: blur(40px); opacity:.25;
              background: radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--muted) 18%, white 82%), transparent 70%);
              transform: translateZ(0); will-change: transform;
            }

            /* Safety: any nested panel/card content should not cause horizontal scroll */
            .no-x{ overflow-x:hidden; }
          `,
        }}
      />

      {/* Subtle site-wide decorative backdrop (does not affect layout or scroll) */}
      <div className="page-backdrop">
        <div className="glow" />
      </div>

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
                  Lock in, {firstName}.
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

        {/* Soft haze echoing Welcome, clipped to header to avoid horizontal scroll */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-6 no-x"
          style={{
            width: '46vmin',
            height: '46vmin',
            transform: 'translateX(25%)',
            filter: 'blur(28px)',
            opacity: 0.28,
            background:
              'radial-gradient(40vmin 40vmin at 70% 50%, color-mix(in oklab, var(--muted) 18%, white 82%), transparent 65%)',
          }}
        />
      </header>

      {/* CONTENT PANELS — visual only; logic & props unchanged */}
      <main className="max-w-7xl mx-auto px-6 pb-16 space-y-10 w-full no-x">
        {/* Your Sets */}
        <section className="panel rounded-3xl p-6 md:p-8 shadow-sm w-full no-x">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2
              className="text-xl sm:text-2xl font-semibold"
              style={{ color: 'var(--fg)' }}
            >
              Your Sets
            </h2>
            {/* (Optional presentational-only controls; inert) */}
            <div className="hidden sm:flex items-center gap-2" aria-hidden>
              <button className="btn btn-ghost">All</button>
              <button className="btn btn-ghost">In progress</button>
              <button className="btn btn-ghost">Completed</button>
            </div>
          </div>

          {/* Keep Row component untouched */}
          <Row title="Your Sets" items={userSetsList} />
        </section>

        {/* Example Sets */}
        <section className="panel rounded-3xl p-6 md:p-8 shadow-sm w-full no-x">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2
              className="text-xl sm:text-2xl font-semibold"
              style={{ color: 'var(--fg)' }}
            >
              Example Sets
            </h2>
          </div>

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