import {
  pgTable,
  serial,
  varchar,
  decimal,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const items = pgTable("items", {
  id: serial("id").primaryKey(),

  name: varchar("name", {
    length: 100,
  }).notNull(),

  price: decimal("price", {
    precision: 10,
    scale: 2,
  }).notNull(),

  stock: integer("stock").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});