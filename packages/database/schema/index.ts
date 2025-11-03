import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

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

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
});

export const db = drizzle(pool, {
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
});
