"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function TryDemoButton() {
  const router = useRouter();

  async function anonSignonHandler() {
    const {data: session, error} = await authClient.getSession();
    if (!session?.user || error) {
      await authClient.signIn.anonymous();
    }

    router.push("/demo");
  }

  return (
        <button onClick={anonSignonHandler}>
          Try the demo app right now!
        </button>
  );
}
