// app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/apiClient";
import Link from "next/link";
import { useAppContext } from "@/Context";

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
  const { setState } = useAppContext();

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
      const res = await apiClient.post('/register', { email, password, name });

      const { token, user } = res.data;

      setState({ token, user });

      console.log('redirecting');
      router.push('/dashboard');

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Internal Server Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "var(--cream)",
        fontFamily:
          'ui-sans-serif, system-ui, "Inter", "Source Sans 3", Arial, sans-serif',
        color: "var(--green)",
      }}
    >
      <style
        // theme + focus to match welcome/login
        dangerouslySetInnerHTML={{
          __html: `
            :root{
              --green:#283618; --olive:#606c38; --cream:#fefae0; --amber:#dda15e; --burnt:#bc6c25;
            }
            .focus-strong:focus-visible{
              outline:none; box-shadow:0 0 0 2px var(--amber), 0 0 0 6px var(--cream);
            }
            main :where(a){
              color: var(--burnt);
              text-underline-offset: 2px;
            }
            main :where(a:hover){ filter: brightness(0.95); }
          `,
        }}
      />

      {/* Minimal navbar (same as login) */}
      <nav className="w-full sticky top-0 z-40 supports-[backdrop-filter]:bg-[color:var(--cream)]/80 backdrop-blur">
        <div
          className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between border-b"
          style={{ borderColor: "var(--olive)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-6 rounded-md shadow"
              style={{ backgroundColor: "var(--green)" }}
              aria-label="AutoCard logo"
            />
            <span className="text-2xl font-extrabold tracking-tight">AutoCard</span>
          </div>
          <div aria-hidden />
        </div>
      </nav>

      {/* Full-screen, no "window" — just the form */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6">
          <div className="min-h-[70vh] grid place-items-center">
            <div className="w-full max-w-md">
              <h1
                className="mb-6 font-extrabold tracking-tight"
                style={{
                  fontFamily:
                    'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
                  fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                  background:
                    "linear-gradient(90deg, var(--green) 0%, var(--olive) 35%, var(--amber) 70%, var(--burnt) 100%)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Create account
              </h1>

              {error && (
                <div
                  className="mb-5 rounded-md p-3 text-sm"
                  style={{
                    background:
                      "color-mix(in oklab, var(--burnt) 10%, white 90%)",
                    color: "var(--burnt)",
                    border:
                      "1px solid color-mix(in oklab, var(--burnt) 35%, white 65%)",
                  }}
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium"
                    style={{ color: "var(--green)" }}
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
                    className="block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--amber)] focus:ring-offset-2 focus:ring-offset-[color:var(--cream)]"
                    style={{
                      backgroundColor: "#fff",
                      border:
                        "1px solid color-mix(in oklab, var(--olive) 70%, black 0%)",
                      color: "var(--green)",
                    }}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium"
                    style={{ color: "var(--green)" }}
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
                    className="block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--amber)] focus:ring-offset-2 focus:ring-offset-[color:var(--cream)]"
                    style={{
                      backgroundColor: "#fff",
                      border:
                        "1px solid color-mix(in oklab, var(--olive) 70%, black 0%)",
                      color: "var(--green)",
                    }}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                    style={{ color: "var(--green)" }}
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
                    className="block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--amber)] focus:ring-offset-2 focus:ring-offset-[color:var(--cream)]"
                    style={{
                      backgroundColor: "#fff",
                      border:
                        "1px solid color-mix(in oklab, var(--olive) 70%, black 0%)",
                      color: "var(--green)",
                    }}
                    placeholder="••••••••"
                  />
                  <p className="mt-1 text-xs" style={{ color: "var(--olive)" }}>
                    Must be at least 6 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium"
                    style={{ color: "var(--green)" }}
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
                    className="block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--amber)] focus:ring-offset-2 focus:ring-offset-[color:var(--cream)]"
                    style={{
                      backgroundColor: "#fff",
                      border:
                        "1px solid color-mix(in oklab, var(--olive) 70%, black 0%)",
                      color: "var(--green)",
                    }}
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-md px-4 py-2 font-semibold shadow-sm transition hover:brightness-[1.02] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--cream)] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "var(--green)",
                    color: "var(--cream)",
                    border: "1px solid var(--green)",
                  }}
                >
                  {loading ? "Creating account…" : "Sign up"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm" style={{ color: "var(--olive)" }}>
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold focus:outline-none focus:underline"
                    style={{ color: "var(--burnt)" }}
                  >
                    Log in
                  </Link>
                </p>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/"
                  className="text-sm focus:outline-none focus:underline"
                  style={{ color: "var(--olive)" }}
                >
                  ← Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer to match theme */}
      <footer className="mt-auto">
        <div className="mx-auto max-w-6xl px-6 py-10">
          {/* Footer content removed */}
        </div>
      </footer>
    </div>
  );
}
