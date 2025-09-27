import { text, pgTable, varchar, date } from "drizzle-orm/pg-core";
import { timestampColumns } from "../utils";
import { usersTable } from "./usersTable";

export const bookingsTable = pgTable("bookings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  pickupAddress: varchar("pickup_address", { length: 255 }).notNull(),
  pickupDate: date("pickup_date", { mode: "date" }).notNull(),
  dropoffAddress: varchar("dropoff_address", { length: 255 }).notNull(),
  dropoffDate: date("dropoff_date", { mode: "date" }).notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  ...timestampColumns,
});

export type BookingInsert = typeof bookingsTable.$inferInsert;

export type BookingSelect = typeof bookingsTable.$inferSelect;