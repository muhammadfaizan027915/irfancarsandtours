import { ApiHandler } from "./handlers.types";
import { BaseApiError, handleError } from "../errors";
import { NextResponse, NextRequest } from "next/server";


export function handleApiWithError(handler: ApiHandler) {
  return async function (request: NextRequest) {
    try {
      const result = await handler(request);

      if (result instanceof NextResponse) {
        return result;
      }

      NextResponse.json(result);
    } catch (error) {
      const errorPayload = handleError(error);

      const status = error instanceof BaseApiError ? error.status : 500;

      return NextResponse.json(errorPayload, { status });
    }
  };
}
