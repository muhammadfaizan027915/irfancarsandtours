import { z } from "zod";

export const SeoSchema = z.object({
  title: z.string().max(255, "Title must be at most 255 characters").optional(),
  description: z.string().optional(),
  keywords: z
    .preprocess((val) => {
      if (!val) return [];
      if (typeof val === "string") return val.split(",").map((v) => v.trim());
      return Array.isArray(val) ? val : [val];
    }, z.array(z.string()))
    .optional(),
  ogImage: z.url("Invalid image URL").optional().or(z.literal("")),
  robots: z.string().max(50).optional(),
  canonicalUrl: z.url("Invalid URL").optional().or(z.literal("")),
});

export const UpsertSeoBodySchema = SeoSchema.extend({
  carId: z.uuid("Invalid car ID"),
});

export type UpsertSeoBodyDto = z.infer<typeof UpsertSeoBodySchema>;
