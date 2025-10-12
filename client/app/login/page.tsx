// app/login/page.tsx
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
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
      {/* Shared theme + accessible focus */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root{
              --green:#283618; --olive:#606c38; --cream:#fefae0; --amber:#dda15e; --burnt:#bc6c25;
            }
            .focus-strong:focus-visible{
              outline:none; box-shadow:0 0 0 2px var(--amber), 0 0 0 6px var(--cream);
            }
            /* Make links in the form match theme */
            main :where(a){
              color: var(--burnt);
              text-underline-offset: 2px;
            }
            main :where(a:hover){ filter: brightness(0.95); }
          `,
        }}
      />

      {/* Minimal navbar to match welcome page */}
      <nav className="w-full sticky top-0 z-40 supports-[backdrop-filter]:bg-[color:var(--cream)]/80 backdrop-blur">
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
          <div aria-hidden />
        </div>
      </nav>

      {/* Full-screen, no "window" wrapper */}
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
                Login
              </h1>

              {/* Render the form directly—no card, no border */}
              <LoginForm />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <div className="mx-auto max-w-6xl px-6 py-10">
          {/* Footer content removed */}
        </div>
      </footer>
    </div>
  );
}
