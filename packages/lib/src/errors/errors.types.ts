import { ErrorMessages } from "./errors.constants";

export enum ErrorCode {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  DUPLICATE_EMAIL = "DUPLICATE_EMAIL",
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export type ErrorCodeType = keyof typeof ErrorMessages;

export type BaseApiErrorOptions<
  TCause extends object = object,
  TArgs extends any[] = any[]
> = {
  message?: string;
  cause?: TCause;
  args?: TArgs;
};
