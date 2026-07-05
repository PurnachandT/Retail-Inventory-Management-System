import { db } from "../db";
import { bills } from "../schema/bills";
import { billItems } from "../schema/billItems";
import { items } from "../schema/items";
import { eq, sql, and } from "drizzle-orm";
import { customers } from "../schema/customers";


export class BillService {

    async createBill(data: any) {

        return await db.transaction(async (tx) => {

            let total = 0;

            const purchasedItems: any[] = [];

            // Step 1 - Validate Items & Calculate Total
            for (const billItem of data.items) {

                const result = await tx
                    .select()
                    .from(items)
                    .where(eq(items.id, Number(billItem.itemId)));

                if (result.length === 0) {
                    throw new Error(`Item ${billItem.itemId} not found`);
                }

                const item = result[0];

                if (item.stock < billItem.quantity) {
                    throw new Error(`${item.name} has only ${item.stock} items left`);
                }

                total += Number(item.price) * billItem.quantity;

                purchasedItems.push({
                    item,
                    quantity: billItem.quantity
                });
            }

            // Step 2 - Create Bill
            const newBill = await tx
                .insert(bills)
                .values({
                    customerId: data.customerId,
                    total: total.toFixed(2),
                    status: "PAID"
                })
                .returning();

            const billId = newBill[0].id;

            // Step 3 - Insert Bill Items & Update Stock
            for (const purchase of purchasedItems) {

                await tx.insert(billItems).values({
                    billId,
                    itemId: purchase.item.id,
                    quantity: purchase.quantity,
                    price: purchase.item.price
                });

                await tx
                    .update(items)
                    .set({
                        stock: sql`${items.stock} - ${purchase.quantity}`
                    })
                    .where(eq(items.id, purchase.item.id));
            }

            return {
                message: "Bill created successfully",
                billId,
                total
            };

        });

    }

    async getBills() {
        const result = await db
            .select()
            .from(bills);

        return result;
    }

    async getBillById(id: number) {

        const bill = await db
            .select()
            .from(bills)
            .where(eq(bills.id, id));

        if (bill.length === 0) {
            throw new Error("Bill not found");
        }

        const purchasedItems = await db
            .select({
                id: billItems.id,
                quantity: billItems.quantity,
                price: billItems.price,
                itemName: items.name,
            })
            .from(billItems)
            .innerJoin(items, eq(billItems.itemId, items.id))
            .where(eq(billItems.billId, id));

        const customer = await db
            .select()
            .from(customers)
            .where(eq(customers.id, bill[0].customerId));

        return {
            bill: {
                ...bill[0],
                customer: customer[0],
            },
            items: purchasedItems,
        };


    }

    async deleteBill(id: number) {

    return await db.transaction(async (tx) => {

        // Get bill items
        const purchasedItems = await tx
            .select()
            .from(billItems)
            .where(eq(billItems.billId, id));

        if (purchasedItems.length === 0) {
            throw new Error("Bill not found");
        }

        // Restore stock
        for (const purchase of purchasedItems) {

            await tx
                .update(items)
                .set({
                    stock: sql`${items.stock} + ${purchase.quantity}`
                })
                .where(eq(items.id, purchase.itemId));

        }

        // Delete bill items
        await tx
            .delete(billItems)
            .where(eq(billItems.billId, id));

        // Delete bill
        await tx
            .delete(bills)
            .where(eq(bills.id, id));

        return {
            message: "Bill deleted successfully"
        };

    });

}

}