import { drizzle } from "drizzle-orm/node-postgres";

import { carsTable } from "./carsTable";
import { usersTable } from "./usersTable";
import { sessionsTable } from "./sessionsTable";
import { accountsTable } from "./accountsTable";
import { verificationTokensTable } from "./verificationTokensTable";

export * from "./enums";
export * from "./carsTable";
export * from "./usersTable";
export * from "./sessionsTable";
export * from "./accountsTable";
export * from "./verificationTokensTable";

export const db = drizzle({
  schema: {
    carsTable,
    usersTable,
    sessionsTable,
    accountsTable,
    verificationTokensTable,
  },

  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});
