import { CardSet } from '../lib/types';
import SetCard from './SetCard';

interface RowProps {
  title: string;
  items: CardSet[];
}

export default function Row({ title, items }: RowProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-4 px-4 sm:px-6 lg:px-8">
        {title}
      </h2>
      <div className="overflow-x-auto scroll-smooth">
        <div className="flex gap-4 px-4 sm:px-6 lg:px-8 scroll-snap-type-x-mandatory">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex-shrink-0 w-64 scroll-snap-align-start"
            >
              <SetCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
