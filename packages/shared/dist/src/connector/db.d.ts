import "reflect-metadata";
export declare class DrizzleConnector {
    private dbUrl;
    constructor(dbUrl: string);
    Connect(): Promise<import("drizzle-orm/node-postgres").NodePgDatabase<Record<string, never>> & {
        $client: import("pg").Pool;
    }>;
}
//# sourceMappingURL=db.d.ts.map