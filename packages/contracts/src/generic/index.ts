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

export const toDate = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((arg) => {
    if (arg === null || arg === undefined) return arg;
    if (arg instanceof Date) return arg;
    if (typeof arg === "number") return new Date(arg);
    if (typeof arg === "string") {
      const d = new Date(arg);
      return isNaN(d.getTime()) ? arg : d;
    }
    return arg;
  }, schema);
