import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { migrate } from "drizzle-orm/libsql/migrator";
import * as schema from "@/db/schema";

let testDb: ReturnType<typeof drizzle> | null = null;

export function getTestDb() {
  if (!testDb) {
    const client = createClient({ url: ":memory:" });
    testDb = drizzle(client, { schema });
    migrate(testDb, { migrationsFolder: "./drizzle/migrations" });
  }
  return testDb;
}

export function resetTestDb() {
  if (testDb) {
    testDb.delete(schema.user).run();
    testDb.delete(schema.session).run();
    testDb.delete(schema.account).run();
    testDb.delete(schema.verification).run();
  }
}

export function closeTestDb() {
  if (testDb) {
    testDb = null;
  }
}
