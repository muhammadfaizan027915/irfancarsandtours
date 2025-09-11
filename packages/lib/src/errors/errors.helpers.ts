import z, { ZodError } from "zod";
import { BaseApiError } from "./errors";
import { InternalServerError, ValidationError } from "./errors";

export function handleError(error: unknown) {
  if ((error as any).digest?.startsWith("NEXT_REDIRECT")) {
    throw error;
  }

  if (error instanceof BaseApiError) {
    return error.toJSON();
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError({
      cause: z.formatError(error),
    });
    return validationError.toJSON();
  }

  if (error instanceof Error) {
    const internalError = new InternalServerError({
      cause: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    });
    return internalError.toJSON();
  }

  const unknownError = new InternalServerError({
    cause: { value: error },
  });
  return unknownError.toJSON();
}
