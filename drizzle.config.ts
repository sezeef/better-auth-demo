import type { Config } from "drizzle-kit";

// import dotenv from "dotenv";
// dotenv.config({
//     path: ".env.local"
// })

export default {
  dialect: "turso",
  schema: "./src/db/schema.ts",
  out: "./migrations",
  strict: true,
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config;
