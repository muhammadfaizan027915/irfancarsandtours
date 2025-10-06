import { integer, text, pgTable, boolean, varchar } from "drizzle-orm/pg-core";
import {
  brandEnum,
  fuelTypeEnum,
  amenitiesEnum,
  carTypeEnum,
  transmissionTypeEnum,
} from "./enums";
import { timestampColumns } from "../utils";

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

  ...timestampColumns,
});

export type CarInsert = typeof carsTable.$inferInsert;

export type CarSelect = typeof carsTable.$inferSelect;
