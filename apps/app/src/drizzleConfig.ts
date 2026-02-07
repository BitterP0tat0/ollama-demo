import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
config();

export default defineConfig({
  schema: "./schema.ts",
  out: "./src/supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.dbUrl!,
  },
});
