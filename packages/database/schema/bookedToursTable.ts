import { integer, pgTable, text } from "drizzle-orm/pg-core";

import { timestampColumns } from "../utils";
import { tourBookingsTable } from "./tourBookingsTable";
import { toursTable } from "./toursTable";

export const bookedToursTable = pgTable("booked_tours", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  tourBookingId: text("tour_booking_id")
    .notNull()
    .references(() => tourBookingsTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
  tourId: text("tour_id")
    .notNull()
    .references(() => toursTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
  adultsNumber: integer("adults_number").notNull(),
  childrenNumber: integer("children_number").notNull(),
  quotedPricePerAdult: integer("quoted_price_per_adult").notNull(),
  quotedPricePerChild: integer("quoted_price_per_child").notNull(),
  ...timestampColumns,
});

export type BookedTourInsert = typeof bookedToursTable.$inferInsert;
export type BookedTourSelect = typeof bookedToursTable.$inferSelect;
