import { drizzle } from "drizzle-orm/singlestore";
import { injectable } from "inversify";
import postgres from 'postgres';

@injectable()
export class DrizzleConnector {
    private client;
    private db;

    constructor(private dbUrl: string) {
        this.client = postgres(this.dbUrl);
        this.db = drizzle(this.client);
    }
}