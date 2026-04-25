import { text, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestampColumns } from "../utils";

export const seoTable = pgTable("seo", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  keywords: text("keywords").array(),
  ogImage: text("og_image"),
  robots: varchar("robots", { length: 50 }),
  canonicalUrl: text("canonical_url"),
  ...timestampColumns,
});

export type SeoInsert = typeof seoTable.$inferInsert;
export type SeoSelect = typeof seoTable.$inferSelect;
