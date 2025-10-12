// app/page.tsx
import Link from "next/link";

export default function Home() {
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
      {/* Theme variables + strong focus rings */}
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

      {/* NAVBAR */}
      <nav className="w-full sticky top-0 z-50 supports-[backdrop-filter]:bg-[color:var(--cream)]/80 backdrop-blur">
        <div
          className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between border-b"
          style={{ borderColor: "var(--olive)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-lg grid place-items-center shadow"
              style={{ backgroundColor: "var(--green)", color: "var(--cream)" }}
              aria-label="AutoCard logo"
            >
              AC
            </div>
            <span className="text-2xl font-extrabold tracking-tight">AutoCard</span>
          </div>

          {/* Login action – matches theme (primary green) */}
          <Link
            href="/login"
            className="px-5 py-2 rounded-xl font-semibold shadow transition hover:brightness-[1.02] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--cream)]"
            style={{
              backgroundColor: "var(--green)",
              color: "var(--cream)",
              border: "1px solid var(--green)",
            }}
          >
            Login
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid place-items-center text-center" style={{ minHeight: "56vh" }}>
            <div className="relative w-full" style={{ maxWidth: "66ch" }}>
              {/* subtle right-side haze */}
              <div
                aria-hidden
                className="pointer-events-none absolute right-[-6vw] top-1/2 -translate-y-1/2"
                style={{
                  width: "48vmin",
                  height: "48vmin",
                  filter: "blur(28px)",
                  opacity: 0.35,
                  background:
                    "radial-gradient(40vmin 40vmin at 70% 50%, color-mix(in oklab, var(--amber) 12%, white 88%), transparent 65%)",
                }}
              />

              <h1
                className="font-extrabold tracking-tight leading-tight"
                style={{
                  fontFamily:
                    'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
                  /* a touch smaller and responsive to help keep each line on one row */
                  fontSize: "clamp(1.7rem, 5vw, 3.4rem)",
                }}
              >
                <span
                  className="block whitespace-nowrap"
                  style={{
                    /* cleaner green gradient */
                    background:
                      "linear-gradient(90deg, var(--green) 0%, color-mix(in oklab, var(--green) 55%, var(--olive) 45%) 45%, var(--olive) 100%)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Turn notes into quizzes
                </span>
                <span className="block whitespace-nowrap" style={{ color: "var(--green)" }}>
                  Study faster
                </span>
                <span className="block whitespace-nowrap" style={{ color: "var(--green)" }}>
                  Remember Longer
                </span>
              </h1>

              <div className="mt-8 flex justify-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-lg font-semibold shadow-md transition hover:brightness-[1.02] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--cream)]"
                  style={{
                    backgroundColor: "var(--green)",
                    color: "var(--cream)",
                    border: "1px solid var(--green)",
                  }}
                >
                  Get Started
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* HOW IT WORKS — refined colors, cohesive with theme */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div
          className="relative rounded-3xl p-8 md:p-10 shadow-sm"
          style={{
            background: `
              radial-gradient(60vmax 40vmax at 90% -10%, color-mix(in oklab, var(--amber) 12%, white 88%) 0%, transparent 60%),
              linear-gradient(180deg,
                color-mix(in oklab, var(--cream) 96%, white 4%) 0%,
                color-mix(in oklab, var(--cream) 90%, var(--olive) 10%) 100%
              )
            `,
            border: "1px solid color-mix(in oklab, var(--olive) 20%, white 80%)",
          }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="text-3xl md:text-4xl font-extrabold"
              style={{
                color: "var(--green)",
                fontFamily:
                  'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
              }}
            >
              How it works
            </h2>
            <p className="mt-3 text-base md:text-lg" style={{ color: "var(--olive)" }}>
              Three quick steps.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { step: "1", title: "Drop your material", body: "PDFs, slides, or text." },
              { step: "2", title: "AI builds the quiz", body: "Clear questions & answers." },
              { step: "3", title: "Play & retain", body: "Quick rounds + smart spacing." },
            ].map((s, i) => (
              <div
                key={i}
                className="h-full rounded-2xl p-6 flex flex-col shadow-sm"
                style={{
                  background: `
                    linear-gradient(180deg,
                      color-mix(in oklab, var(--cream) 94%, white 6%) 0%,
                      color-mix(in oklab, var(--cream) 88%, var(--amber) 12%) 100%
                    )
                  `,
                  border: "1px solid color-mix(in oklab, var(--olive) 18%, white 82%)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="h-9 w-9 rounded-full grid place-items-center text-sm font-bold shadow-sm"
                    style={{
                      /* Badge colors tuned to palette */
                      background:
                        "linear-gradient(180deg, color-mix(in oklab, var(--olive) 78%, black 0%) 0%, color-mix(in oklab, var(--olive) 60%, white 40%) 100%)",
                      color: "var(--cream)",
                      border: "1px solid color-mix(in oklab, var(--olive) 50%, white 50%)",
                    }}
                    aria-label={`Step ${s.step}`}
                  >
                    {s.step}
                  </div>
                  <h3
                    className="text-lg font-bold"
                    style={{
                      color: "var(--green)",
                      fontFamily:
                        'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
                    }}
                  >
                    {s.title}
                  </h3>
                </div>
                <p className="text-sm" style={{ color: "var(--olive)" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* Secondary CTA */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/signup"
              className="rounded-xl px-7 py-3 text-base font-semibold shadow-md transition hover:brightness-[1.02] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--cream)]"
              style={{
                backgroundColor: "var(--green)",
                color: "var(--cream)",
                border: "1px solid var(--green)",
              }}
            >
              Create your first set
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto">
        <div className="mx-auto max-w-6xl px-6 py-10">{/* intentionally minimal */}</div>
      </footer>
    </div>
  );
}
