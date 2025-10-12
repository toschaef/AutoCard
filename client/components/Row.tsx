'use client';

import { CardSet } from '@/types';
import SetCard from './SetCard';

interface RowProps {
  title: string;
  items: CardSet[];
}

export default function Row({ title, items }: RowProps) {
  if (!items || items.length === 0) {
    return (
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4" style={{ color: 'var(--green)' }}>
          {title}
        </h2>
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 text-center">
          <p className="text-slate-600 text-base">
            {title === 'Your Sets' && "You haven't created any card sets yet."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--green)' }}>
        {title}
      </h2>

      {/* Responsive grid: 1/2/3/4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <SetCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
