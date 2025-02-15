import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error("Authentication provider error: Missing environment variables");
}

// has to be exported with the variable name `auth` OR as a default export
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true, // default but set for clarity
    },
    socialProviders: {
        github: { 
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET, 
        }, 
    },
});
