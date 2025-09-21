import z from "zod";

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(
  itemSchema: T
) =>
  z.object({
    data: z.array(itemSchema),
    pagination: z.object({
      total: z.number().int(),
      page: z.number().int(),
      limit: z.number().int(),
      pages: z.number().int(),
    }),
  });

export const toArray = <T extends z.ZodTypeAny>(schema: T) =>
  z
    .union([schema, z.array(schema)])
    .optional()
    .transform((val) =>
      val === undefined ? undefined : Array.isArray(val) ? val : [val]
    );
