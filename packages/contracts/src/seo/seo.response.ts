import { z } from "zod";

export const SeoResponseSchema = z.object({
  id: z.string(),
  carId: z.string(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  keywords: z.array(z.string()).nullable().default([]),
  ogImage: z.string().nullable(),
  robots: z.string().nullable(),
  canonicalUrl: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type SeoResponseDto = z.infer<typeof SeoResponseSchema>;
