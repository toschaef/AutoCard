'use client';

import { useState, useMemo } from 'react';
import { CardSet } from '@/types';
import SetCard from './SetCard';

interface RowProps {
  title: string;
  items: CardSet[];
}

const STEP = 2;      // move 2 at a time
const PAGE_SIZE = 6; // how many visible at once (responsive grid still looks good)

export default function Row({ title, items }: RowProps) {
  const [start, setStart] = useState(0);

  const maxStart = Math.max(0, items.length - PAGE_SIZE);
  const slice = useMemo(
    () => items.slice(start, start + PAGE_SIZE),
    [items, start]
  );

  if (items.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 px-4 sm:px-6 lg:px-8">
          {title}
        </h2>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-500 text-lg">
              {/* Keep only Your Sets empty state */}
              {title === 'Your Sets' && "You haven't created any card sets yet."}
            </p>
            {title === 'Your Sets' && (
              <button className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                Create Your First Set
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  const prev = () => setStart(s => Math.max(0, s - STEP));
  const next = () => setStart(s => Math.min(maxStart, s + STEP));

  return (
    <section className="mb-10">
      <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={start === 0}
            className="p-2 rounded-lg border border-slate-300 bg-white disabled:opacity-40 hover:bg-slate-50"
            aria-label="Previous sets"
          >
            ‹
          </button>
          <button
            onClick={next}
            disabled={start >= maxStart}
            className="p-2 rounded-lg border border-slate-300 bg-white disabled:opacity-40 hover:bg-slate-50"
            aria-label="Next sets"
          >
            ›
          </button>
        </div>
      </div>

      {/* Grid page instead of horizontal slider */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {slice.map(item => (
            <SetCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
