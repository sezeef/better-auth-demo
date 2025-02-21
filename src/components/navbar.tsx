import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { SignoutButton } from "@/components/signout-button";

export async function Navbar() {
  let authState: Awaited<ReturnType<typeof auth.api.getSession>> = null;

  try {
    authState = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error("[NAVBAR] Error:\n", error);
  }

  return (
    <nav className="w-fit flex gap-5 mb-10 border p-2 text-lg font-medium underline">
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/signin">Signin</Link>
      <Link href="/signup">Signup</Link>
      {authState?.user && <SignoutButton />}
    </nav>
  );
}
