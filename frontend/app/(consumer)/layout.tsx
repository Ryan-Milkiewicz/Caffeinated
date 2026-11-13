import { redirect } from "next/navigation";

export default async function ConsumerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      {/* Consumer navigation */}
      <header className="border-b border-border">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="/feed" className="text-xl font-bold text-primary">
            Caffeinated
          </a>

          <div className="flex items-center gap-6">
            <a href="/feed">Feed</a>
            <a href="/discover">Discover</a>
            <a href="/cafes">Cafes</a>
            <a href="/coffees">Coffees</a>
            <a href="/profile">Profile</a>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
