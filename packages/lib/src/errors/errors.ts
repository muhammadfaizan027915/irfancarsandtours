import { BaseApiErrorOptions, ErrorCode } from "./errors.types";
import { ErrorMessages } from "./errors.constants";

export class BaseApiError<
  TCause extends Record<string, any> = {},
  TArgs extends any[] = any[]
> extends Error {
  status: number;
  code: ErrorCode;
  cause?: TCause;

  constructor(
    code: ErrorCode,
    status: number,
    { message, cause, args }: BaseApiErrorOptions<TCause, TArgs> = {}
  ) {
    const msg = message ?? BaseApiError.resolveMessage(code, args);

    super(msg);
    this.code = code;
    this.status = status;
    this.cause = cause;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  private static resolveMessage<TArgs extends any[]>(
    code: ErrorCode,
    args?: TArgs
  ): string {
    const msg = ErrorMessages[code];

    if (typeof msg === "function") {
      return msg(...((args ?? []) as unknown as Parameters<typeof msg>));
    }

    return msg;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      status: this.status,
      cause: this.cause,
    };
  }
}

export class ValidationError extends BaseApiError<{ field?: string }> {
  constructor(options: BaseApiErrorOptions = {}) {
    super(ErrorCode.VALIDATION_ERROR, 400, options);
  }
}

export class UnauthorizedError extends BaseApiError {
  constructor(options: BaseApiErrorOptions = {}) {
    super(ErrorCode.UNAUTHORIZED, 401, options);
  }
}

export class ForbiddenError extends BaseApiError {
  constructor(options: BaseApiErrorOptions = {}) {
    super(ErrorCode.FORBIDDEN, 403, options);
  }
}

export class NotFoundError extends BaseApiError<object, [string]> {
  constructor(resource: string, options: BaseApiErrorOptions = {}) {
    super(ErrorCode.NOT_FOUND, 404, { ...options, args: [resource] });
  }
}

export class DuplicateEmailError extends BaseApiError<{ email: string }> {
  constructor(email: string, options: BaseApiErrorOptions = {}) {
    super(ErrorCode.DUPLICATE_EMAIL, 409, {
      ...options,
      cause: { email, ...(options.cause as object) },
    });
  }
}

export class InternalServerError extends BaseApiError {
  constructor(options: BaseApiErrorOptions = {}) {
    super(ErrorCode.INTERNAL_SERVER_ERROR, 500, options);
  }
}
