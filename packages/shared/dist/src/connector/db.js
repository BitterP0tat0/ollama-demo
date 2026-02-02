var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { drizzle } from 'drizzle-orm/postgres-js';
import { injectable } from "inversify";
import postgres from 'postgres';
import "reflect-metadata";
let DrizzleConnector = class DrizzleConnector {
    dbUrl;
    constructor(dbUrl) {
        this.dbUrl = dbUrl;
        this.dbUrl = dbUrl;
    }
    async Connect() {
        try {
            const client = postgres(this.dbUrl);
            const db = drizzle({ client });
            console.log("Connected to database");
            return db;
        }
        catch (error) {
            throw new Error("Error connecting to database");
        }
    }
};
DrizzleConnector = __decorate([
    injectable(),
    __metadata("design:paramtypes", [String])
], DrizzleConnector);
export { DrizzleConnector };
//# sourceMappingURL=db.js.map