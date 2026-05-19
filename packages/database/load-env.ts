import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { config } from "dotenv";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

export function loadEnv(): void {
  const envFile =
    process.env.NODE_ENV === "development" ? ".env.dev" : ".env.prod";
  const envPath = path.join(repoRoot, envFile);

  if (existsSync(envPath)) {
    config({ path: envPath, override: false });
  }
}
