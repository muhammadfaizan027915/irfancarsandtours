import { integer, text, pgTable, varchar, boolean } from "drizzle-orm/pg-core";
import {
  BrandNamesList,
  FuelTypesList,
  AmenitiesList,
  CarTypesList,
  TransmissionTypesList,
} from "./enums";
import { timestampColumns } from "../utils";

export const carsTable = pgTable("cars", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  model: varchar("model", { length: 255 }).notNull(),
  year: integer("year").notNull(),
  brand: varchar("brand", {
    length: 255,
    enum: BrandNamesList,
  }).notNull(),
  carType: varchar("car_type", {
    length: 100,
    enum: CarTypesList,
  }).notNull(),
  fuelType: varchar("fuel_type", {
    length: 100,
    enum: FuelTypesList,
  }).notNull(),
  transmissionType: varchar("transmission_type", {
    length: 100,
    enum: TransmissionTypesList,
  }).notNull(),
  amenities: varchar("amenities", {
    length: 500,
    enum: AmenitiesList,
  }).array().notNull(),
  imageUrls: varchar("image_urls", { length: 500 }).array(),
  seatingCapacity: integer("seating_capacity").notNull(),
  description: text("description"), 
  isFeatured: boolean("is_featured").default(false),
  timesSearched: integer("times_searched").default(0),
  isAllowedBookingWithoutDriver: boolean(
    "is_allowed_booking_without_driver"
  ).default(false),
  ...timestampColumns,
});

export type CarInsert = typeof carsTable.$inferInsert;

export type CarSelect = typeof carsTable.$inferSelect;
