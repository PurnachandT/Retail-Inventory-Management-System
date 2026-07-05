import {
  pgTable,
  serial,
  integer,
  decimal,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const bills = pgTable("bills", {
  id: serial("id").primaryKey(),

  customerId: integer("customer_id").notNull(),

  total: decimal("total", {
    precision: 10,
    scale: 2,
  }).notNull(),

  status: varchar("status", { length: 20 })
    .default("PAID")
    .notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});