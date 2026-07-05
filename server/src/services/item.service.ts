import { db } from "../db";
import { items } from "../schema/items";
import { billItems } from "../schema/billItems";
import { bills } from "../schema/bills";
import { eq } from "drizzle-orm";

export class ItemService {

  async create(data: any) {
    await db.insert(items).values(data);

    return {
      message: "Item created successfully",
    };
  }

  async getAll() {
    return await db.select().from(items);
  }

  async getById(id: number) {
    const result = await db
      .select()
      .from(items)
      .where(eq(items.id, id));

    return result[0];
  }

  async update(id: number, data: any) {
    await db
      .update(items)
      .set(data)
      .where(eq(items.id, id));

    return {
      message: "Item updated successfully",
    };
  }

  async delete(id: number) {

    return await db.transaction(async (tx) => {

      // Get all bill items that use this item
      const relatedBillItems = await tx
        .select({
          billId: billItems.billId,
        })
        .from(billItems)
        .where(eq(billItems.itemId, id));

      const billIds = relatedBillItems.map((b) => b.billId);

      // Delete bill items
      await tx
        .delete(billItems)
        .where(eq(billItems.itemId, id));

      // Delete bills that no longer have bill items
      if (billIds.length > 0) {

        for (const billId of billIds) {

          const remainingItems = await tx
            .select()
            .from(billItems)
            .where(eq(billItems.billId, billId));

          if (remainingItems.length === 0) {
            await tx
              .delete(bills)
              .where(eq(bills.id, billId));
          }

        }

      }

      // Delete item
      await tx
        .delete(items)
        .where(eq(items.id, id));

      return {
        message: "Item deleted successfully",
      };

    });

  }

}