import { text, pgTable, integer } from "drizzle-orm/pg-core";
import { bookingsTable } from "./bookingsTable";
import { carsTable } from "./carsTable";
import { timestampColumns } from "../utils";

export const bookedCarsTable = pgTable("booked_cars", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  carId: text("car_id")
    .notNull()
    .references(() => carsTable.id),
  bookingId: text("booking_id")
    .notNull()
    .references(() => bookingsTable.id, { onDelete: "cascade" }),
  quotedPrice: integer("quoted_price"),
  ...timestampColumns,
});


export type BookedCarInsert = typeof bookedCarsTable.$inferInsert;

export type BookedCarSelect = typeof bookedCarsTable.$inferSelect;