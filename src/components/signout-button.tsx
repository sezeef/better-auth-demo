"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignoutButton() {
  const router = useRouter();

  const signOutHandler = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          console.error("[signOutHandler] Error:\n", ctx.error);
        },
      },
    });
  };

  return (
    <button onClick={signOutHandler} className="px-2 border">
      Sign out
    </button>
  );
}
