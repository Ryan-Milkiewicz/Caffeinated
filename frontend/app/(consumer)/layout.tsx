import { LogoutButton } from "../components/auth/logout-button";
import { verifySession } from "@/lib/auth/dal";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ConsumerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="/feed" className="text-xl font-bold text-primary">
            Caffeinated.
          </a>

          <div className="flex items-center gap-6">
            <a href="/feed">Feed</a>
            <a href="/discover">Discover</a>
            <a href="/cafes">Cafes</a>
            <a href="/coffees">Coffees</a>
            <a href="/profile">Profile</a>
            <LogoutButton />
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Suspense fallback={<Skeleton />}>
          <AuthGate>{children}</AuthGate>
        </Suspense>
      </main>
    </div>
  );
}

async function AuthGate({ children }: { children: React.ReactNode }) {
  await verifySession();
  return <>{children}</>;
}
