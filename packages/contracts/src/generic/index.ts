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
        } catch {
          // If JSON parse fails, we continue to other parsing methods
        }
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

export const PhoneSchema = z
  .string()
  .regex(
    /^\+?[1-9]\d{1,14}$|^(\+?\d{1,3})?[\s-]?\(?\d{2,4}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}$/,
    "Invalid phone number format. Use E.164 (e.g., +1234567890) or a standard local format."
  );

export const CNICSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9\s-]{5,20}$/,
    "Invalid National ID / CNIC format. Must be alphanumeric and between 5-20 characters."
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
