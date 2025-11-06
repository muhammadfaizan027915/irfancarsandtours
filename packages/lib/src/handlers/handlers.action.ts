import { ZodObject } from "zod";
import { handleError } from "../errors";
import { ServerAction } from "./handlers.types";
import { formDataToObject } from "../utils/form-to-object";

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
  TResult
>(args: {
  schema: ZodObject<any>;
  action: (args: TArgs) => Promise<TResult> | void;
  shouldResetForm?: boolean;
}) {
  return async function (prevState: unknown, formData: FormData) {
    try {
      const payload = args.schema.parse(formDataToObject(formData));
      const data = await args.action(payload as TArgs);

      return {
        success: true,
        data: data ?? null,
      };
    } catch (error) {
      const errorPayload = handleError(error);
      return { success: false, error: errorPayload };
    }
  };
}
