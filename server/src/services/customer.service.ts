import { db } from "../db";
import { customers } from "../schema/customers";
import { eq, inArray } from "drizzle-orm";
import { bills } from "../schema/bills";
import { billItems } from "../schema/billItems";


export class CustomerService {

    async create(data: any) {
        await db.insert(customers).values(data);

        return {
            message: "Customer created successfully",
        };
    }

    async getAll() {
        return await db.select().from(customers);
    }

    async getById(id: number) {
        const result = await db
            .select()
            .from(customers)
            .where(eq(customers.id, id));

        return result[0];
    }

    async update(id: number, data: any) {
        await db
            .update(customers)
            .set(data)
            .where(eq(customers.id, id));

        return {
            message: "Customer updated successfully",
        };
    }

    async delete(id: number) {

    return await db.transaction(async (tx) => {

        // Get all bills for this customer
        const customerBills = await tx
            .select({
                id: bills.id,
            })
            .from(bills)
            .where(eq(bills.customerId, id));

        const billIds = customerBills.map((b) => b.id);

        // Delete bill items first
        if (billIds.length > 0) {
            await tx
                .delete(billItems)
                .where(inArray(billItems.billId, billIds));
        }

        // Delete bills
        await tx
            .delete(bills)
            .where(eq(bills.customerId, id));

        // Delete customer
        await tx
            .delete(customers)
            .where(eq(customers.id, id));

        return {
            message: "Customer deleted successfully",
        };

    });

}
}