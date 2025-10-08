import { ZodObject } from "zod";
import { handleError } from "../errors";
import { ServerAction } from "./handlers.types";
import { parseWithZod } from "@conform-to/zod/v4";
import type { SubmissionResult } from "@conform-to/react";

export function handleServerActionWithError<TArgs extends unknown[], TResult>(
  action: ServerAction<TArgs, TResult>
) {
  return async (...args: TArgs) => {
    try {
      const result = await action(...args);
      return { error: null, data: result };
    } catch (error) {
      const errorPayload = handleError(error);
      return { error: errorPayload, data: null };
    }
  };
}

export function handlerFormActionWithError<
  TArgs,
  TResult = SubmissionResult
>(args: {
  schema: ZodObject<any>;
  action: (args: TArgs) => Promise<TResult> | void;
  shouldResetForm?: boolean;
}) {
  return async function (prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, { schema: args.schema });

    if (submission.status !== "success") {
      return submission.reply();
    }

    try {
      await args.action(submission.payload as TArgs);
      return submission.reply({ resetForm: args.shouldResetForm });
    } catch (error) {
      console.log("Error in form action:", error);
      const errorPayload = handleError(error);
      return submission.reply({ formErrors: [errorPayload?.message] });
    }
  };
}
