import { pgTable, bigint, timestamp, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const demo = pgTable("demo", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "demo_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	demoo: text(),
});

export const haha = pgTable("haha", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "haha_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: text("Name").default('alice'),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	age: bigint({ mode: "number" }),
});
