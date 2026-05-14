import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import path from "path";

const isDev = process.env.NODE_ENV === "development";
const envFile = isDev ? ".env.dev" : ".env";

dotenv.config({ path: path.resolve(process.cwd(), "../../", envFile), override: true });

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
