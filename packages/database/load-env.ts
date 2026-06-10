import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { config } from "dotenv";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

export function loadEnv(): void {
  const env = process.env.NODE_ENV || "development";

  if (env !== "development" && env !== "production") {
    throw new Error(
      `Invalid NODE_ENV value: ${env}. Expected "development" or "production".`,
    );
  }

  const envFile = env === "development" ? ".env.dev" : ".env.prod";
  const envPath = path.join(repoRoot, envFile);

  if (existsSync(envPath)) {
    config({ path: envPath, override: false });
  }
}
