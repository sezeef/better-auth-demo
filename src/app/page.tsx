import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Home() {
  let authState: Awaited<ReturnType<typeof auth.api.getSession>> = null;

  try {
    authState = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error("[HOMEPAGE] Error:\n", error);
  }

  return (
    <main>
      <section>
        Welcome Home, {authState?.user ? authState.user.name : "Stranger"}
      </section>
    </main>
  );
}
