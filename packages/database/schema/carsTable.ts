import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { timestampColumns } from "../utils";
import {
  amenitiesEnum,
  brandEnum,
  carTypeEnum,
  fuelTypeEnum,
  transmissionTypeEnum,
} from "./enums";
import { seoTable } from "./seoTable";

export const carsTable = pgTable("cars", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  model: varchar("model", { length: 255 }).notNull(),
  year: integer("year").notNull(),
  brand: brandEnum("brand").notNull(),
  carType: carTypeEnum("car_type").notNull(),
  fuelType: fuelTypeEnum("fuel_type").notNull(),
  transmissionType: transmissionTypeEnum("transmission_type").notNull(),
  amenities: amenitiesEnum("amenities").array().notNull(),
  imageUrls: text("image_urls").array(),
  seatingCapacity: integer("seating_capacity").notNull(),
  description: text("description"),
  isFeatured: boolean("is_featured").default(false),
  timesSearched: integer("times_searched").default(0),
  forceWithDriver: boolean("force_with_driver").default(false),
  seoId: text("seo_id").unique().references(() => seoTable.id, { onDelete: "set null" }),

  ...timestampColumns,
});

export type CarInsert = typeof carsTable.$inferInsert;

export type CarSelect = typeof carsTable.$inferSelect;
