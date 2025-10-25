'use client';
import Link from 'next/link';
import { useAppContext } from '@/Context';

export default function Header() {
  const { user, logout } = useAppContext();

  return ( 
    <nav className="w-full top-0 z-50 supports-[backdrop-filter]:bg-[color:var(--cream)]/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href={user ? `/dashboard` : `/`} className="flex items-center gap-3">
            <div className="h-10 w-6 rounded-md shadow bg-[color:var(--green)]" aria-label="AutoCard logo"/>
            <span className="text-2xl font-extrabold tracking-tight text-[color:var(--green)]">AutoCard</span>
          </Link>

          {!user ?
          <Link
            href="/login"
            className="px-5 py-2 rounded-xl bg-[color:var(--green)] text-[color:var(--cream)] border-[color:var(--green)] border-1 font-semibold shadow transition hover:brightness-[1.02] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--cream)]"
          >
            Login
          </Link>
          :
          <Link
            href="/"
            className="px-5 py-2 rounded-xl bg-[color:var(--green)] text-[color:var(--cream)] border-[color:var(--green)] border-1 font-semibold shadow transition hover:brightness-[1.02] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--cream)]"
            onClick={logout}
          >
            Logout
          </Link>
          }
        </div>
      </nav>
  )
}
