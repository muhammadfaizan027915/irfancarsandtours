import { ExtractTablesWithRelations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { NodePgQueryResultHKT } from "drizzle-orm/node-postgres";
import { PgTransaction } from "drizzle-orm/pg-core";
import { Pool } from "pg";

import { accountsTable } from "./accountsTable";
import { bookedCarsTable } from "./bookedCarsTable";
import { bookedToursTable } from "./bookedToursTable";
import { bookingsTable } from "./bookingsTable";
import { carsTable } from "./carsTable";
import { complaintsTable } from "./complaintsTable";
import * as relations from "./relations";
import { seoTable } from "./seoTable";
import { sessionsTable } from "./sessionsTable";
import { tourBookingsTable } from "./tourBookingsTable";
import { toursTable } from "./toursTable";
import { usersTable } from "./usersTable";
import { verificationTokensTable } from "./verificationTokensTable";

export * from "./accountsTable";
export * from "./bookedCarsTable";
export * from "./bookedToursTable";
export * from "./bookingsTable";
export * from "./carsTable";
export * from "./complaintsTable";
export * from "./enums";
export * from "./relations";
export * from "./seoTable";
export * from "./sessionsTable";
export * from "./tourBookingsTable";
export * from "./toursTable";
export * from "./usersTable";
export * from "./verificationTokensTable";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
}).on("error", (err) => {
  console.log("Error in database: ", err)
 });

const tables = {
  carsTable,
  usersTable,
  sessionsTable,
  accountsTable,
  verificationTokensTable,
  complaintsTable,
  bookingsTable,
  bookedCarsTable,
  seoTable,
  toursTable,
  tourBookingsTable,
  bookedToursTable,
  ...relations,
};

export const db = drizzle(pool, {
  schema: tables,
});

export type Database = typeof db;

export type Transaction = PgTransaction<
  NodePgQueryResultHKT,
  typeof tables,
  ExtractTablesWithRelations<typeof tables>
>;

export type DbOrTransaction = Database | Transaction;
