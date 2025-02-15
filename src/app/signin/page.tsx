"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");

    async function signInHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        await authClient.signIn.email({
            email,
            password,
            fetchOptions: {
                onRequest: () => {
                    setIsPending(true);
                    setError("");
                },
                onSuccess: () => {
                    setIsPending(false);
                    setError("");
                    router.push("/dashboard");
                },
                onError: (ctx) => {
                    setIsPending(false);
                    setError(
                        ctx.error.message || "An unexpected error occurred",
                    );
                    console.error("[signInHandler] Error:\n", ctx.error);
                },
            },
        });
    }

    async function githubSignonHandler(
        event: React.MouseEvent<HTMLButtonElement>,
    ) {
        event.preventDefault();
        await authClient.signIn.social({
            provider: "github",
            callbackURL: "/dashboard",
            fetchOptions: {
                onRequest: () => {
                    setIsPending(true);
                    setError("");
                },
                onSuccess: () => {
                    setIsPending(false);
                    setError("");
                },
                onError: (ctx) => {
                    setIsPending(false);
                    setError(
                        ctx.error.message || "An unexpected error occurred",
                    );
                    console.error("[githubSignOnHandler] Error:\n", ctx.error);
                },
            },
        });
    }

    return (
        <form
            onSubmit={signInHandler}
            className="max-w-80 px-4 py-8 border flex flex-col items-center gap-4"
        >
            <fieldset className="w-full flex justify-between">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    inputMode="email"
                    className="border-2 bg-white dark:bg-neutral-900"
                    required
                />
            </fieldset>
            <fieldset className="w-full flex justify-between">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    className="border-2 bg-white dark:bg-neutral-900"
                    required
                />
            </fieldset>
            {error && (
                <span id="form-error" role="alert" className="text-red-500">
                    {error}
                </span>
            )}
            <button
                type="submit"
                className="w-40 border disabled:text-neutral-500 disabled:cursor-progress"
                disabled={isPending}
            >
                {isPending ? "Signing In..." : "Sign In"}
            </button>
            <ul>
                <li>
                    <button
                        className="underline hover:cursor-pointer disabled:text-neutral-500 disabled:cursor-progress"
                        disabled={isPending}
                        onClick={githubSignonHandler}
                    >
                        [github]
                    </button>
                </li>
            </ul>
            <Link href="/signup" className="underline">
                Don&apos;t have an account?
            </Link>
        </form>
    );
}
