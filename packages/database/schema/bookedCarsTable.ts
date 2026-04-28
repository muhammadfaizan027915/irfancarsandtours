import { boolean,integer, pgTable, text } from "drizzle-orm/pg-core";

import { timestampColumns } from "../utils";
import { bookingsTable } from "./bookingsTable";
import { carsTable } from "./carsTable";

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
  bookedWithDriver: boolean("booked_with_driver").default(false),
  quantity: integer("quantity").default(1),
  ...timestampColumns,
});


export type BookedCarInsert = typeof bookedCarsTable.$inferInsert;

export type BookedCarSelect = typeof bookedCarsTable.$inferSelect;