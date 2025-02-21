"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export default function SignUpPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  async function signUpHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const image = formData.get("image") as File;
    const image64 =
      image.size > 0 ? await convertImageToBase64(image) : undefined;

    await authClient.signUp.email({
      email,
      password,
      name,
      image: image64,
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
          setError(ctx.error.message || "An unexpected error occurred");
          console.error("[signUpHandler] Error:\n", ctx.error);
        },
      },
    });
  }

  return (
    <form
      onSubmit={signUpHandler}
      encType="multipar/form-data"
      className="max-w-80 px-4 py-8 border flex flex-col items-center gap-4"
    >
      <fieldset className="w-full flex justify-between">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          inputMode="text"
          className="border-2 bg-white dark:bg-neutral-900"
          required
        />
      </fieldset>
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
          autoComplete="new-password"
          className="border-2 bg-white dark:bg-neutral-900"
          required
        />
      </fieldset>
      <fieldset className="w-full flex justify-between">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          disabled={isPending}
          className="w-[12.3rem]"
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
        {isPending ? "Signing Up..." : "Sign Up"}
      </button>
      <Link href="/signin" className="underline">
        Already have an account?
      </Link>
    </form>
  );
}
