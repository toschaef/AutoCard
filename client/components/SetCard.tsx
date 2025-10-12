import { CardSet } from '@/types';
import Link from 'next/link';

interface SetCardProps {
  item: CardSet;
}

export default function SetCard({ item }: SetCardProps) {
  return (
    <div
      className="group relative bg-white rounded-xl border border-slate-200 shadow-sm
                 transition-all duration-300 hover:shadow-lg hover:scale-[1.03] focus-within:scale-[1.03] focus-within:shadow-lg"
      data-testid="set-card"
      tabIndex={0}
    >
      {/* Title */}
      <div className="p-6 h-48 flex items-center justify-center">
        <h3 className="text-lg font-semibold text-slate-900 text-center leading-tight">
          {item.title}
        </h3>
      </div>

      {/* Bottom-corner actions (emerge on hover/focus) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-3 pb-3">
        <div className="flex justify-between">
          <Link
            href={`/set/${item.id}/edit`}
            className="pointer-events-auto translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0
                       px-4 py-2 rounded-lg text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 transition"
            data-testid="btn-edit"
            aria-label={`Edit ${item.title}`}
            title={`Edit ${item.title}`}
          >
            Edit
          </Link>

          <Link
            href={`/play/${item.id}`}
            className="pointer-events-auto translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0
                       px-4 py-2 rounded-lg text-sm font-medium text-white bg-sky-700 hover:bg-sky-800 transition"
            data-testid="btn-play"
            aria-label={`Play ${item.title}`}
            title={`Play ${item.title}`}
          >
            Play
          </Link>
        </div>
      </div>
    </div>
  );
}
