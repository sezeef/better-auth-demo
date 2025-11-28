import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  let authState: Awaited<ReturnType<typeof auth.api.getSession>> = null;

  try {
    authState = await auth.api.getSession({
      headers: await headers(),
    });

    if (!authState?.user) throw new Error();
  } catch (error) {
    console.error("[DASHBOARD] Error:\n", error);
  }

  return (
    <main>
      <section>
        <h1>
        Welcome to Dashboard,{" "}
        <span className="bold">{authState?.user.name}</span>
        {authState?.user?.image && (
          <Image
            src={authState.user.image}
            alt="User image"
            className="rounded-lg"
            width={256}
            height={256}
          />
        )}
        </h1>
      </section>
    </main>
  );
}
