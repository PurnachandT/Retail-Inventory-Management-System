import {
  pgTable,
  serial,
  integer,
  decimal,
} from "drizzle-orm/pg-core";

export const billItems = pgTable("bill_items", {
  id: serial("id").primaryKey(),

  billId: integer("bill_id").notNull(),

  itemId: integer("item_id").notNull(),

  quantity: integer("quantity").notNull(),

  price: decimal("price", {
    precision: 10,
    scale: 2,
  }).notNull(),
});