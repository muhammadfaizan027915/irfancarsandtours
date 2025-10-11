if (!process.env.NEXT_RUNTIME) {
  const path = await import("path");
  const dotenv = await import("dotenv");
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
}

import { drizzle } from "drizzle-orm/node-postgres";

import { carsTable } from "./carsTable";
import { usersTable } from "./usersTable";
import { sessionsTable } from "./sessionsTable";
import { accountsTable } from "./accountsTable";
import { verificationTokensTable } from "./verificationTokensTable";
import { contactsTable } from "./contactsTable";
import { bookingsTable } from "./bookingsTable";
import { bookedCarsTable } from "./bookedCarsTable";

export * from "./enums";
export * from "./carsTable";
export * from "./usersTable";
export * from "./sessionsTable";
export * from "./accountsTable";
export * from "./verificationTokensTable";
export * from "./contactsTable";
export * from "./bookingsTable";
export * from "./bookedCarsTable";

export const db = drizzle({
  schema: {
    carsTable,
    usersTable,
    sessionsTable,
    accountsTable,
    verificationTokensTable,
    contactsTable,
    bookingsTable,
    bookedCarsTable,
  },

  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: false,
    query_timeout: 0,
    statement_timeout: 0,
  },
});
