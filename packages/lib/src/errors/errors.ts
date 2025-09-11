import { BaseApiErrorOptions, ErrorCode } from "./errors.types";
import { ErrorMessages } from "./errors.constants";



export class BaseApiError extends Error {
  status: number;
  code: ErrorCode;
  cause?: unknown;

  constructor(
    code: ErrorCode,
    status: number,
    { message, cause, args }: BaseApiErrorOptions = {}
  ) {
    const msg = message ?? BaseApiError.resolveMessage(code, args);

    super(msg);
    this.code = code;
    this.status = status;
    this.cause = cause;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  private static resolveMessage(code: ErrorCode, args?: unknown[]): string {
    const msg = ErrorMessages[code];

    if (typeof msg === "function") {
      return (msg as (...args: unknown[]) => string)(...(args ?? []));
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

export class ValidationError extends BaseApiError {
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

export class NotFoundError extends BaseApiError {
  constructor(resource: string, options: BaseApiErrorOptions = {}) {
    super(ErrorCode.NOT_FOUND, 404, { ...options, args: [resource] });
  }
}

export class DuplicateEmailError extends BaseApiError {
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
