import { integer, text, pgTable, varchar } from "drizzle-orm/pg-core";
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
  }).notNull(),
  imageUrl: varchar("image_urls", { length: 500 }).array(),
  seatingCapacity: integer("seating_capacity").notNull(),
  pricePerDay: integer("price_per_day").notNull(),
  ...timestampColumns,
});
