import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-6">
      <div className="flex max-w-lg flex-col items-center text-center">
        <h1 className="text-5xl font-bold tracking-tight text-stone-900">
          caffeinated<span className="text-amber-700">.</span>
        </h1>

        <p className="mt-4 text-lg text-stone-600">
          Discover coffee. Find your next favorite.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/register"
            className="rounded-lg bg-stone-900 px-6 py-3 font-medium text-white transition hover:bg-stone-700"
          >
            Create account
          </Link>

          <Link
            href="/login"
            className="rounded-lg border border-stone-300 px-6 py-3 font-medium text-stone-900 transition hover:bg-stone-100"
          >
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
