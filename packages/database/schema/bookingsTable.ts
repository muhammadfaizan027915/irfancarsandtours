import { text, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { timestampColumns } from "../utils";
import { usersTable } from "./usersTable";
import { bookingStatusEnum } from "./enums";

export const bookingsTable = pgTable("bookings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => {
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      return `BK${date}-${random}`;
    }),
  pickupAddress: varchar("pickup_address", { length: 255 }).notNull(),
  pickupDate: timestamp("pickup_date", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  dropoffAddress: varchar("dropoff_address", { length: 255 }).notNull(),
  dropoffDate: timestamp("dropoff_date", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  status: bookingStatusEnum("status").default("pending").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  ...timestampColumns,
});

export type BookingInsert = typeof bookingsTable.$inferInsert;

export type BookingSelect = typeof bookingsTable.$inferSelect;