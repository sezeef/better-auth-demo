import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const DB_URL = process.env.TURSO_DATABASE_URL;
const DB_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

if (!DB_URL || !DB_AUTH_TOKEN) {
    throw new Error("Database initialization error: Missing environment variables");
}

export const client = createClient({
    url: DB_URL,
    authToken: DB_AUTH_TOKEN
});

export const db = drizzle({ client });
