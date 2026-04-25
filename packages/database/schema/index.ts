import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./index";

import { carsTable } from "./carsTable";
import { usersTable } from "./usersTable";
import { sessionsTable } from "./sessionsTable";
import { accountsTable } from "./accountsTable";
import { verificationTokensTable } from "./verificationTokensTable";
import { complaintsTable } from "./complaintsTable";
import { bookingsTable } from "./bookingsTable";
import { bookedCarsTable } from "./bookedCarsTable";
import { seoTable } from "./seoTable";
import * as relations from "./relations";

export * from "./enums";
export * from "./carsTable";
export * from "./usersTable";
export * from "./sessionsTable";
export * from "./accountsTable";
export * from "./verificationTokensTable";
export * from "./complaintsTable";
export * from "./bookingsTable";
export * from "./bookedCarsTable";
export * from "./seoTable";
export * from "./relations";

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
    complaintsTable,
    bookingsTable,
    bookedCarsTable,
    seoTable,
    ...relations,
  },
});

export type Database = typeof db;
export type Transaction = NodePgDatabase<any>;
