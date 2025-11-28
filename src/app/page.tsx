import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { TryDemoButton } from "@/components/try-demo-button";

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
        <h1>
          Welcome Home, {authState?.user ? authState.user.name : "Stranger"}
        </h1>
      </section>
      <section>
        <TryDemoButton />
      </section>
    </main>
  );
}
