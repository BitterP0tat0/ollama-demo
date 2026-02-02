import postgres from 'postgres';
import "reflect-metadata";
export declare class DrizzleConnector {
    private dbUrl;
    constructor(dbUrl: string);
    Connect(): Promise<import("drizzle-orm/postgres-js").PostgresJsDatabase<Record<string, never>> & {
        $client: postgres.Sql<{}>;
    }>;
}
//# sourceMappingURL=db.d.ts.map