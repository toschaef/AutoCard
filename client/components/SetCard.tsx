import { CardSet } from '../lib/types';
import Link from 'next/link';

interface SetCardProps {
  item: CardSet;
}

export default function SetCard({ item }: SetCardProps) {
  return (
    <div
      className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-black/5 bg-white shadow-sm transition-all duration-200 will-change-transform hover:shadow-md hover:scale-[1.02] focus-within:shadow-md focus-within:scale-[1.02]"
      data-testid="set-card"
      tabIndex={0}
    >
      {/* Flowing gradient background */}
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,var(--grad-from),var(--grad-via),var(--grad-to))] animate-gradient-flow group-hover:animate-gradient-flow-fast group-focus-within:animate-gradient-flow-fast"
        aria-hidden="true"
      />

      {/* Title (centered) */}
      <div className="relative h-full grid place-items-center px-4 text-center">
        <h3 className="text-xl font-semibold text-slate-900 leading-tight">
          {item.title}
        </h3>
      </div>

      {/* Reveal panel (description + buttons on hover/focus) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/40 to-transparent text-white translate-y-3 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {/* Description */}
        <p className="text-sm leading-snug line-clamp-2 mb-3">
          {item.description}
        </p>

        {/* Buttons container */}
        <div className="pointer-events-auto flex items-center justify-between gap-3">
          <Link
            href={`/set/${item.id}/edit`}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 transition focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
            data-testid="btn-edit"
            aria-label={`Edit ${item.title}`}
            title={`Edit ${item.title}`}
          >
            Edit
          </Link>

          <Link
            href={`/play/${item.id}`}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
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
