import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AUTH_COOKIE = ".AspNetCore.Identity.Application";

export type CurrentUser = {
  userId: string;
  email: string;
  displayName: string | null;
  roles: string[];
};

export const getSession = cache(async (): Promise<CurrentUser | null> => {
  const cookieStore = await cookies();
  if (!cookieStore.has(AUTH_COOKIE)) return null;

  try {
    const response = await fetch(`${process.env.API_URL}/api/auth/me`, {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    });
    return response.ok ? ((await response.json()) as CurrentUser) : null;
  } catch {
    return null;
  }
});

export const verifySession = cache(async (): Promise<CurrentUser> => {
  const user = await getSession();
  if (!user) redirect("/login");
  return user;
});
