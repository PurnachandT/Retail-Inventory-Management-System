import { db } from "../db";
import { customers } from "../schema/customers";
import { items } from "../schema/items";
import { bills } from "../schema/bills";
import { eq, desc } from "drizzle-orm";

export class DashboardService {

    async getDashboard() {

        // Customers
        const customerList = await db
            .select()
            .from(customers);

        // Items
        const itemList = await db
            .select()
            .from(items);

        // Bills
        const billList = await db
            .select()
            .from(bills);

        // Revenue
        let revenue = 0;

        billList.forEach((bill: any) => {
            revenue += Number(bill.total);
        });

        // Latest Bills with Customer Name
        const latestBills = await db
            .select({
                id: bills.id,
                customer: customers.name,
                total: bills.total,
                createdAt: bills.createdAt,
            })
            .from(bills)
            .innerJoin(
                customers,
                eq(bills.customerId, customers.id)
            )
            .orderBy(desc(bills.createdAt))
            .limit(5);

        return {

            totalCustomers: customerList.length,

            totalItems: itemList.length,

            totalBills: billList.length,

            totalRevenue: revenue,

            latestBills

        };

    }

}