import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Select,
  Button,
  Table,
  InputNumber,
  Space,
  message,
  Row,
  Col,
  Avatar,
  Tag,
} from "antd";

import {
  ShoppingCartOutlined,
  UserOutlined,
  PlusOutlined,
  DeleteOutlined,
  FileDoneOutlined,
  DollarCircleOutlined,
  InboxOutlined,
} from "@ant-design/icons";

import { getCustomers } from "../../services/customer.service";
import { getItems } from "../../services/item.service";
import { createBill } from "../../services/bill.service";

import "./billing.css";

const { Title, Text } = Typography;

export default function Billing() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);

  const [customerId, setCustomerId] = useState<number>();

  const [billItems, setBillItems] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const customerData = await getCustomers();
      const itemData = await getItems();

      setCustomers(customerData);
      setItems(itemData);
    } catch {
      message.error("Failed to load data");
    }
  };

  const addItem = () => {
    setBillItems([
      ...billItems,
      {
        itemId: undefined,
        quantity: 1,
      },
    ]);
  };

  const updateItem = (
    index: number,
    key: string,
    value: any
  ) => {
    const temp = [...billItems];

    temp[index][key] = value;

    setBillItems(temp);
  };

  const getTotal = () => {
    let total = 0;

    billItems.forEach((billItem) => {
      const item = items.find(
        (i: any) => i.id === billItem.itemId
      );

      if (item) {
        total += Number(item.price) * billItem.quantity;
      }
    });

    return total;
  };

  const handleGenerateBill = async () => {
    try {
      await createBill({
        customerId,
        items: billItems,
      });

      message.success("Bill Generated Successfully");

      setCustomerId(undefined);
      setBillItems([]);

      loadData();

    } catch (error: any) {
      message.error(
        error.response?.data?.message ||
          "Failed to generate bill"
      );
    }
  };

  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 20,
        boxShadow: "0 15px 35px rgba(0,0,0,.08)",
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{
          marginBottom: 30,
        }}
      >
        <Col>
          <Space size={16}>
            <Avatar
              size={64}
              style={{
                background:
                  "linear-gradient(135deg,#1677ff,#69b1ff)",
              }}
              icon={<ShoppingCartOutlined />}
            />

            <div>
              <Title
                level={2}
                style={{
                  marginBottom: 0,
                }}
              >
                Billing
              </Title>

              <Text type="secondary">
                Create customer invoices
              </Text>
            </div>
          </Space>
        </Col>
      </Row>

      <Card
        style={{
          marginBottom: 24,
          borderRadius: 16,
          background:
            "linear-gradient(135deg,#f8fbff,#ffffff)",
        }}
      >
        <Text strong>
          <UserOutlined /> Customer
        </Text>

        <br />
        <br />

        <Select
          size="large"
          placeholder="Select Customer"
          style={{
            width: 400,
          }}
          value={customerId}
          onChange={setCustomerId}
          options={customers.map((c) => ({
            value: c.id,
            label: c.name,
          }))}
        />
      </Card>

      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        style={{
          borderRadius: 12,
          marginBottom: 20,
        }}
        onClick={addItem}
      >
        Add Item
      </Button>
      <Table
        rowKey={(_, index) => String(index)}
        pagination={false}
        dataSource={billItems}
        bordered={false}
        columns={[
          {
            title: "Item",
            width: 420,
            render: (_: any, record: any, index: number) => (
              <Space size={14}>
                <Avatar
                  style={{
                    background:
                      "linear-gradient(135deg,#1677ff,#69b1ff)",
                  }}
                  icon={<InboxOutlined />}
                />

                <Select
                  size="large"
                  style={{
                    width: 300,
                  }}
                  placeholder="Select Item"
                  value={record.itemId}
                  onChange={(value) =>
                    updateItem(index, "itemId", value)
                  }
                  options={items.map((item: any) => ({
                    value: item.id,
                    label: `${item.name} (${item.stock} Stock)`,
                  }))}
                />
              </Space>
            ),
          },
          {
            title: "Price",
            width: 170,
            render: (_: any, record: any) => {
              const item = items.find(
                (i: any) => i.id === record.itemId
              );

              return (
                <Tag
                  color="blue"
                  style={{
                    borderRadius: 20,
                    padding: "4px 12px",
                    fontSize: 14,
                  }}
                >
                  ₹ {item ? item.price : 0}
                </Tag>
              );
            },
          },
          {
            title: "Quantity",
            width: 180,
            render: (_: any, record: any, index: number) => (
              <InputNumber
                min={1}
                size="large"
                value={record.quantity}
                style={{
                  width: 110,
                  borderRadius: 10,
                }}
                onChange={(value) =>
                  updateItem(index, "quantity", value)
                }
              />
            ),
          },
          {
            title: "Total",
            width: 180,
            render: (_: any, record: any) => {
              const item = items.find(
                (i: any) => i.id === record.itemId
              );

              const total = item
                ? Number(item.price) * record.quantity
                : 0;

              return (
                <Text
                  strong
                  style={{
                    color: "#1677ff",
                    fontSize: 16,
                  }}
                >
                  ₹ {total.toFixed(2)}
                </Text>
              );
            },
          },
          {
            title: "",
            width: 90,
            render: (_: any, record: any, index: number) => (
              <Button
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => {
                  const temp = [...billItems];
                  temp.splice(index, 1);
                  setBillItems(temp);
                }}
              />
            ),
          },
        ]}
      />
<Space
  style={{
    marginTop: 20,
    width: "100%",
    justifyContent: "space-between",
  }}
>
  <Title level={4}>
    Total : ₹ {getTotal()}
  </Title>

  <Button
    type="primary"
    size="large"
    onClick={handleGenerateBill}
  >
    Generate Bill
  </Button>
</Space>
    </Card>
  );
}