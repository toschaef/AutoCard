'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Theme variables + focus style in case this renders standalone */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root{
              --green:#283618; --olive:#606c38; --cream:#fefae0; --amber:#dda15e; --burnt:#bc6c25;
            }
            .focus-strong:focus-visible{
              outline:none; box-shadow:0 0 0 2px var(--amber), 0 0 0 6px var(--cream);
            }
          `,
        }}
      />

      {/* Keep an accessible heading but hide visually if the page already provides one */}
      <h2 className="sr-only">Sign in to your account</h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium"
            style={{ color: 'var(--green)' }}
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--amber)] focus:ring-offset-2 focus:ring-offset-[color:var(--cream)]"
              style={{
                backgroundColor: '#fff',
                border: '1px solid color-mix(in oklab, var(--olive) 70%, black 0%)',
                color: 'var(--green)',
              }}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium"
            style={{ color: 'var(--green)' }}
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--amber)] focus:ring-offset-2 focus:ring-offset-[color:var(--cream)]"
              style={{
                backgroundColor: '#fff',
                border: '1px solid color-mix(in oklab, var(--olive) 70%, black 0%)',
                color: 'var(--green)',
              }}
              placeholder="Enter your password"
            />
          </div>
        </div>

        {error && (
          <div
            className="rounded-md p-3 text-sm"
            style={{
              background: 'color-mix(in oklab, var(--burnt) 10%, white 90%)',
              color: 'var(--burnt)',
              border: '1px solid color-mix(in oklab, var(--burnt) 35%, white 65%)',
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md px-4 py-2 font-semibold shadow-sm transition hover:brightness-[1.02] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--cream)] disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--green)',
            color: 'var(--cream)',
            border: '1px solid var(--green)',
          }}
        >
          {isLoading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      {/* Sign-up link (kept) */}
      <div className="mt-6 text-center">
        <p className="text-sm" style={{ color: 'var(--olive)' }}>
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-semibold focus:outline-none focus:underline"
            style={{ color: 'var(--burnt)' }}
          >
            Create new account
          </Link>
        </p>
      </div>

      {/* Demo credentials (theme-matched) */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div
              className="w-full"
              style={{ borderTop: '1px solid color-mix(in oklab, var(--olive) 40%, white 60%)' }}
            />
          </div>
          <div className="relative flex justify-center text-sm">
            <span
              className="px-2"
              style={{ background: 'var(--cream)', color: 'var(--olive)' }}
            >
              Demo credentials
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-1 text-center">
          <p className="text-xs" style={{ color: 'color-mix(in oklab, var(--olive) 80%, black 0%)' }}>
            Try these demo accounts:
          </p>
          <div className="text-xs" style={{ color: 'var(--green)' }}>
            <div>• ali@example.com / password123</div>
            <div>• sarah@example.com / password123</div>
            <div>• john@example.com / password123</div>
          </div>
        </div>
      </div>
    </div>
  );
}
