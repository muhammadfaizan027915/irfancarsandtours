import { integer, pgTable, text } from "drizzle-orm/pg-core";

import { timestampColumns } from "../utils";
import { bookingStatusEnum } from "./enums";
import { usersTable } from "./usersTable";

export const tourBookingsTable = pgTable("tour_bookings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => {
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      return `BKTO${date}-${random}`;
    }),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  cnic: text("cnic").notNull(),
  status: bookingStatusEnum("status").default("pending").notNull(),
  totalPrice: integer("total_price").notNull(),
  notes: text("notes"),
  ...timestampColumns,
});

export type TourBookingInsert = typeof tourBookingsTable.$inferInsert;
export type TourBookingSelect = typeof tourBookingsTable.$inferSelect;
