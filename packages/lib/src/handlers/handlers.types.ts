import { NextResponse, NextRequest } from "next/server";

export type ApiHandler<T = unknown> = (
  req: NextRequest
) => Promise<NextResponse | T>;

export type ServerAction<TArgs extends unknown[], TResult> = (
  ...args: TArgs
) => Promise<TResult>;
