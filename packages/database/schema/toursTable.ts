import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { timestampColumns } from "../utils";
import { seoTable } from "./seoTable";

export const toursTable = pgTable("tours", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: varchar("slug", { length: 255 }).unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  meetingPoint: text("meeting_point").notNull(),
  startDate: timestamp("start_date", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  pricePerAdult: integer("price_per_adult").notNull(),
  pricePerChild: integer("price_per_child").notNull(),
  maxCapacity: integer("max_capacity").notNull(),
  imageUrls: text("image_urls").array(),
  itinerary: jsonb("itinerary")
    .$type<{ title: string; description: string }[]>()
    .notNull(),
  inclusions: text("inclusions").array(),
  exclusions: text("exclusions").array(),
  isFeatured: boolean("is_featured").default(false),
  seoId: text("seo_id")
    .unique()
    .references(() => seoTable.id, { onDelete: "set null" }),

  ...timestampColumns,
});

export type TourInsert = typeof toursTable.$inferInsert;
export type TourSelect = typeof toursTable.$inferSelect;
