import { defineConfig } from "drizzle-kit";

import { loadEnv } from "./load-env.js";

loadEnv();

export default defineConfig({
  out: "./drizzle",
  schema: "./schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    ssl: false,
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
});
