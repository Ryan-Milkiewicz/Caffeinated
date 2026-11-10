import { SignupForm } from "@/app/components/auth/signup-form";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center py-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Join Caffeinated
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover coffee and connect with your coffee community.
          </p>
        </div>
        <SignupForm />
      </div>
    </main>
  );
}
