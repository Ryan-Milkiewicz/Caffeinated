import "server-only";
import { cookies } from "next/headers";
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();

    const response = await fetch(`${process.env.API_URL}/api/auth/me`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
}
