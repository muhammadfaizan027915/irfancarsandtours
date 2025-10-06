import z, { core } from "zod";

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

export function toArray<T extends core.SomeType>(schema: T) {
  return z.preprocess((input) => {
    if (input === undefined || input === null) {
      return [];
    }

    if (Array.isArray(input)) {
      return input;
    }

    if (typeof input === "string") {
      const s = input.trim();

      if (s.startsWith("[") && s.endsWith("]")) {
        try {
          const parsed = JSON.parse(s);
          if (Array.isArray(parsed)) return parsed;
        } catch {}
      }

      if (s.includes(",")) {
        return s
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean);
      }

      if (s.length === 0) return [];
      return [s];
    }

    return [input];
  }, z.array(schema));
}

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
