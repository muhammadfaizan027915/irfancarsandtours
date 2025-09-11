import { ZodObject } from "zod";
import { handleError } from "../errors";
import { ServerAction } from "./handlers.types";
import { parseWithZod } from "@conform-to/zod/v4";
import type { SubmissionResult } from "@conform-to/react";

export async function handleServerActionWithError<
  TArgs extends unknown[],
  TResult
>(action: ServerAction<TArgs, TResult | void>) {
  return async (...args: TArgs) => {
    try {
      return await action(...args);
    } catch (error) {
      if ((error as any).digest?.startsWith("NEXT_REDIRECT")) {
        throw error;
      }

      const errorPayload = handleError(error);
      return { error: errorPayload };
    }
  };
}

export function handlerFormActionWithError<TArgs, TResult = SubmissionResult>(
  schema: ZodObject<any>,
  action: (args: TArgs) => Promise<TResult> | void
) {
  return async function (prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, { schema });

    if (submission.status !== "success") {
      return submission.reply();
    }

    try {
      await action(submission.payload as TArgs);
      return submission.reply({ resetForm: true });
    } catch (error) {
      const errorPayload = handleError(error);
      return submission.reply({ formErrors: [errorPayload?.message] });
    }
  };
}
