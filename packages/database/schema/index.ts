import { drizzle } from "drizzle-orm/node-postgres";

export * from "./enums";
export * from "./carsTable";
export * from "./usersTable";
export * from "./sessionsTable";
export * from "./verificationTokensTable";
export * from "./accountsTable";

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});
