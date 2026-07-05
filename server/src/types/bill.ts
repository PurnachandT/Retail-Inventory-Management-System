export interface BillItemRequest {
    itemId: number;
    quantity: number;
}

export interface CreateBillRequest {
    customerId: number;
    items: BillItemRequest[];
}