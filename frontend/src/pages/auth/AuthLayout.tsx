import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) => {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden lg:flex flex-col justify-between border-r border-zinc-900 bg-linear-to-br from-zinc-950 via-black to-emerald-950/30 p-10">
          <Link to="/" className="text-sm font-medium tracking-[0.3em] uppercase text-zinc-400">
            Sync
          </Link>

          <div className="max-w-xl space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-emerald-300">
                Clerk Auth
              </div>
              <h1 className="text-5xl font-semibold leading-tight">
                {title}
              </h1>
              <p className="max-w-lg text-lg text-zinc-400">{subtitle}</p>
            </div>

            <div className="grid gap-3 text-sm text-zinc-400">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
                Use email and password, or any other methods you enable in Clerk.
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
                After authentication, Sync will still create or refresh the user in your app database automatically.
              </div>
            </div>
          </div>

          <p className="text-sm text-zinc-500">
            New accounts no longer need the old Google-only entry point.
          </p>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md space-y-6">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Back to Sync
            </Link>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthLayout;
