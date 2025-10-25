'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser } from '@/api/api';
import { useAppContext } from '@/Context'

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { setState } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const res = await loginUser(email, password);

      if (res && res.message === 'Login successful') {
        const { token, user } = res;

        // Store token and user info in context
        setState({ token, user });
        
        // Redirect to dashboard or home page
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }

    } catch (err: unknown) {
      console.error(err);
      setError((err as Error).message || 'Internal Server Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">

      {/* Keep an accessible heading but hide visually if the page already provides one */}
      <h2 className="sr-only">Sign in to your account</h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[color:var(--green)]"
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
              className="block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--amber)] focus:ring-offset-2 focus:ring-offset-[color:var(--cream)] bg-[#fff] text-[color:var(--green)] border border-solid border-olive/70"
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
              className="block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--amber)] focus:ring-offset-2 focus:ring-offset-[color:var(--cream)] bg-[#fff] text-[color:var(--green)] border border-solid border-olive/70"
              placeholder="Enter your password"
            />
          </div>
        </div>

        {error && (
          <div
            className="rounded-md p-3 text-sm bg-[color-mix(in_oklab,var(--burnt)_10%,white_90%)] text-burnt border border-solid border-[color-mix(in_oklab,var(--burnt)_35%,white_65%)] text-[color:var(--green)]"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md px-4 py-2 font-semibold shadow-sm transition hover:brightness-[1.02] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--cream)] disabled:opacity-60 disabled:cursor-not-allowed bg-[color:var(--green)] text-[color:var(--cream)] border-[color:var(--green)] border-1"
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
            className="font-semibold focus:outline-none focus:underline text-[color:var(--amber)]"
          >
            Create new account
          </Link>
        </p>
      </div>
    </div>
  );
}
