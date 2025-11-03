'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/Context";

export default function Home() {
  const router = useRouter();
  const { user } = useAppContext();
  const [hydrated, setHydrated] = useState<Boolean>(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && user) router.push('/dashboard');
  }, [hydrated, user, router]);

  if (!hydrated) return null;

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* HERO */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid place-items-center text-center min-h-[70vh]">
          <div className="relative w-full max-w-[70ch]">
            {/* subtle right-side haze */}
            <div
              aria-hidden
              className="pointer-events-none absolute right-[-6vw] top-1/2 -translate-y-1/2 w-[48vmin] h-[48vmin] blur-3xl opacity-30 bg-gradient-to-tr from-[color:var(--amber)] to-transparent rounded-full"
            />

            <h1 className="font-extrabold tracking-tight leading-tight text-[clamp(1.7rem,5vw,3.4rem)]">
              <span
                className="block whitespace-nowrap bg-[linear-gradient(90deg,var(--green)_0%,color-mix(in_oklab,var(--green)_55%,var(--olive)_45%)_45%,var(--olive)_100%)] bg-clip-text text-transparent"
              >
                Turn notes into quizzes
              </span>
              <span className="block whitespace-nowrap text-[color:var(--green)]">
                Study faster
              </span>
              <span className="block whitespace-nowrap text-[color:var(--green)]">
                Remember Longer
              </span>
            </h1>

            <div className="mt-8 flex justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-lg font-semibold shadow-md transition hover:brightness-[1.02] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--cream)] bg-[color:var(--green)] text-[color:var(--cream)] border-[color:var(--green)] border-1"
              >
                Get Started
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
