"use client";

import { LogoutUser } from "@/lib/auth/action";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <form action={LogoutUser}>
      <Button type="submit" variant="outline">
        Logout
      </Button>
    </form>
  );
}
