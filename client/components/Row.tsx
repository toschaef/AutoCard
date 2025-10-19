'use client';
import { CardSet } from '@/types/types';
import SetCard from './SetCard';

interface RowProps {
  items: CardSet[];
}

export default function Row({ items }: RowProps) {
  return (
    <section className="mb-10">
      {/* Responsive grid: 1/2/3/4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <SetCard key={idx} item={item} />
        ))}
      </div>
    </section>
  );
}
