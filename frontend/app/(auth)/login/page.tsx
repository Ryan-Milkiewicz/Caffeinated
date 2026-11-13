import { LoginForm } from "@/app/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center py-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Sign in to Caffeinated
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover coffee and connect with your coffee community.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
