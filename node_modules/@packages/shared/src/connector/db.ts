import { drizzle } from 'drizzle-orm/postgres-js'
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
            const client = postgres(this.dbUrl)
            const db = drizzle({client});
            console.log("Connected to database");
            return db;
        } catch (error) {
            throw new Error("Error connecting to database")
        }
    }
}