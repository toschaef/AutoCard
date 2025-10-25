// app/login/page.tsx
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Full-screen, no "window" wrapper */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6">
          <div className="min-h-[70vh] grid place-items-center">
            <div className="w-full max-w-md">
              <h1
                className="mb-6 font-extrabold tracking-tight text-[clamp(1.8rem,4vw,2.4rem)] text-center bg-[linear-gradient(90deg,var(--green)_0%,var(--olive)_35%,var(--amber)_70%,var(--burnt)_100%)] bg-clip-text text-transparent"
              >
                Login
              </h1>

              <LoginForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
