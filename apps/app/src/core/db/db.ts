import { config } from "dotenv";
import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import { injectable } from "inversify";
import postgres from "postgres";

config();
@injectable()
export class Drizzle {
  connectionString = process.env.dbUrl;
  client = postgres(this.connectionString!, { prepare: false });
  db = drizzle(this.client);
}
