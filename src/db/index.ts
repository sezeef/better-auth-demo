import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "@/db/schema";
import { getTestDb } from "@/db/test";

export function getDb() {
  if (process.env.NODE_ENV === "test") {
    return getTestDb();
  }

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  return drizzle(client, { schema });
}
