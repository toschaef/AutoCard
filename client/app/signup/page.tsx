// app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/api/api";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { name, email, password, confirmPassword } = formData;

    if (!email || !password || !name) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await registerUser(name, email, password).then(() => {
        router.push('/dashboard');
      });
    } catch (err: unknown) {
      console.error(err);
      setError((err as Error).message || 'Internal Server Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--cream)] text-[color:var(--green)]">

      {/* Full-screen, no "window" — just the form */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6">
          <div className="min-h-[70vh] grid place-items-center">
            <div className="w-full max-w-md">
              <h1
                className="mb-6 font-extrabold tracking-tight text-[clamp(1.8rem,4vw,2.4rem)] text-center bg-[linear-gradient(90deg,var(--green)_0%,var(--olive)_35%,var(--amber)_70%,var(--burnt)_100%)] bg-clip-text text-transparent"
              >
                Create account
              </h1>

              {error && (
                <div
                  className="mb-5 rounded-md p-3 text-sm text-[color:var(--burnt)] bg-[color-mix(in_oklab,var(--burnt)_10%,white_90%)] border border-solid border-[color-mix(in_oklab,var(--burnt)_35%,white_65%)]"
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[color:var(--green)]"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--amber)] focus:ring-offset-2 focus:ring-offset-[color:var(--cream)] text-[color:var(--green)] border border-solid border-olive/70 bg-[#fff]"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[color:var(--green)]"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--amber)] focus:ring-offset-2 focus:ring-offset-[color:var(--cream)] text-[color:var(--green)] border border-solid border-olive/70 bg-[#fff]"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[color:var(--green)]"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--amber)] focus:ring-offset-2 focus:ring-offset-[color:var(--cream)] text-[color:var(--green)] border border-solid border-olive/70 bg-[#fff]"
                    placeholder="••••••••"
                  />
                  <p className="mt-1 text-xs text-[color:var(--olive)]">
                    Must be at least 6 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-[color:var(--green)]"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    minLength={6}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--amber)] focus:ring-offset-2 focus:ring-offset-[color:var(--cream)] text-[color:var(--green)] border border-solid border-olive/70 bg-[#fff]"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-md px-4 py-2 font-semibold shadow-sm transition hover:brightness-[1.02] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--cream)] disabled:opacity-60 disabled:cursor-not-allowed bg-[color:var(--green)] text-[color:var(--cream)] border-[color:var(--green)] border-1"
                >
                  {loading ? "Creating account…" : "Sign up"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-[color:var(--olive)]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold focus:outline-none focus:underline text-[color:var(--burnt)]"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
