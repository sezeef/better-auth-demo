import { envValidator } from "@/lib/env";

export async function register() {
  envValidator();
}
