import React, { forwardRef } from "react";
import {
    Card,
    Divider,
    Table,
    Typography,
    Tag,
    Row,
    Col,
    Button,
} from "antd";

const { Title, Text } = Typography;

interface Props {
    bill: any;
    onClose: () => void;
    onPrint: () => void;
}

const Invoice = forwardRef<HTMLDivElement, Props>(
    ({ bill, onClose, onPrint }, ref) => {
        if (!bill) return null;

        const columns = [
            {
                title: "Item",
                dataIndex: "itemName",
            },
            {
                title: "Qty",
                dataIndex: "quantity",
                align: "center" as const,
            },
            {
                title: "Price",
                align: "right" as const,
                render: (_: any, record: any) => `₹ ${record.price}`,
            },
            {
                title: "Total",
                align: "right" as const,
                render: (_: any, record: any) =>
                    `₹ ${(Number(record.price) * record.quantity).toFixed(2)}`,
            },
        ];

        return (
            <div
                ref={ref}
                style={{
                    maxWidth: 820,
                    margin: "30px auto",
                    borderRadius: 24,
                    overflow: "hidden",
                    background: "linear-gradient(180deg,#ffffff,#fafafa)",
                    boxShadow: "0 25px 60px rgba(0,0,0,.18)",
                    border: "1px solid rgba(255,255,255,.8)",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        background: "linear-gradient(135deg,#1677ff,#69b1ff)",
                        padding: 30,
                        textAlign: "center",
                        color: "white",
                    }}
                >
                    <Title
                        level={2}
                        style={{
                            color: "white",
                            marginBottom: 0,
                        }}
                    >
                        🛒 Retail Inventory
                    </Title>

                    <Text
                        style={{
                            color: "rgba(255,255,255,.9)",
                            fontSize: 16,
                        }}
                    >
                        SALES INVOICE
                    </Text>
                </div>

                <div style={{ padding: 30 }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Text strong>Invoice No</Text>
                            <br />
                            <Text>#{bill.bill.id}</Text>
                        </Col>

                        <Col span={12} style={{ textAlign: "right" }}>
                            <Tag color="green" style={{ fontSize: 14 }}>
                                {bill.bill.status}
                            </Tag>
                        </Col>
                    </Row>

                    <Divider />

                    <Row gutter={16}>
                        <Col span={12}>
                            <Text strong>Customer ID</Text>
                            <br />
                            <Text strong>
                                {bill.bill.customer.name}
                            </Text>

                            <br />

                            <Text type="secondary">
                                {bill.bill.customer.email}
                            </Text>

                            <br />

                            <Text type="secondary">
                                {bill.bill.customer.phone}
                            </Text>
                        </Col>

                        <Col span={12} style={{ textAlign: "right" }}>
                            <Text strong>Date</Text>
                            <br />
                            <Text>
                                {new Date(bill.bill.createdAt).toLocaleDateString()}
                            </Text>
                        </Col>
                    </Row>

                    <Divider />

                    <Table
                        rowKey="id"
                        pagination={false}
                        columns={columns}
                        dataSource={bill.items}
                    />

                    <Divider />

                    <div
                        style={{
                            background: "#f5f7fa",
                            borderRadius: 16,
                            padding: 20,
                            textAlign: "right",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#666",
                            }}
                        >
                            Grand Total
                        </Text>

                        <br />

                        <Title
                            level={2}
                            style={{
                                color: "#1677ff",
                                margin: 0,
                            }}
                        >
                            ₹ {bill.bill.total}
                        </Title>
                    </div>

                    <Divider />

                    <Text
                        style={{
                            display: "block",
                            textAlign: "center",
                            color: "#888",
                            marginBottom: 25,
                        }}
                    >
                        Thank you for shopping with us ❤️
                    </Text>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 16,
                        }}
                    >
                        <Button
                            size="large"
                            style={{
                                borderRadius: 999,
                                paddingInline: 30,
                            }}
                            onClick={onClose}
                        >
                            Close
                        </Button>

                        <Button
                            type="primary"
                            size="large"
                            style={{
                                borderRadius: 999,
                                paddingInline: 30,
                            }}
                            onClick={onPrint}
                        >
                            🖨 Print Invoice
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
);

Invoice.displayName = "Invoice";

export default Invoice;