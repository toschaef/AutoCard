import Link from 'next/link';
import { CardSet } from '../lib/types';

interface SetCardProps {
  item: CardSet;
}

export default function SetCard({ item }: SetCardProps) {
  return (
    <div 
      className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] focus-within:scale-[1.02] focus-within:shadow-lg"
      data-testid="set-card"
      tabIndex={0}
    >
      {/* Base layer with title */}
      <div className="p-6 h-48 flex items-center justify-center">
        <h3 className="text-lg font-semibold text-slate-900 text-center leading-tight">
          {item.title}
        </h3>
      </div>

      {/* Overlay with buttons */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 grid place-items-center rounded-lg">
        <div className="flex gap-3">
          <Link
            href={`/play/${item.id}`}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            data-testid="btn-play"
            aria-label={`Play ${item.title}`}
            title={`Play ${item.title}`}
          >
            Play
          </Link>
          <button
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            data-testid="btn-edit"
            aria-label={`Edit ${item.title}`}
            title={`Edit ${item.title}`}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
