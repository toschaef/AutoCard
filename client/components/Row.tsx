import { CardSet } from '@/types';
import SetCard from './SetCard';

interface RowProps {
  title: string;
  items: CardSet[];
}

export default function Row({ title, items }: RowProps) {
  if (items.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 px-4 sm:px-6 lg:px-8">
          {title}
        </h2>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-500 text-lg">
              {title === "Your Sets" && "You haven't created any card sets yet."}
              {title === "Recent" && "No recent activity."}
              {title === "Drafts" && "No draft sets."}
            </p>
            {title === "Your Sets" && (
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create Your First Set
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

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
