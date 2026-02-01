import { drizzle } from 'drizzle-orm/node-postgres';
import { injectable } from "inversify";
import postgres from 'postgres';
import "reflect-metadata";

@injectable()
export class DrizzleConnector {
    constructor(private dbUrl: string) {
        this.dbUrl = dbUrl;
    }

    async Connect() {
        try {
            const db = drizzle(this.dbUrl);
            console.log("Connected to database");
            return db;
        } catch (error) {
            throw new Error("Error connecting to database")
        }
    }
}