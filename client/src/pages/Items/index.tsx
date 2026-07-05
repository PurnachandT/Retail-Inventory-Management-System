import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Card,
  Typography,
  Space,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Avatar,
  Tag,
} from "antd";

import {
  ShoppingOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DollarOutlined,
  InboxOutlined,
} from "@ant-design/icons";

import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../../services/item.service";

import "./item.css";

const { Title, Text } = Typography;

export default function Items() {
  const [items, setItems] = useState<any[]>([]);
  const [allItems, setAllItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [form] = Form.useForm();

  const loadItems = async () => {
    try {
      setLoading(true);

      const data = await getItems();

      setItems(data);
      setAllItems(data);
    } catch {
      message.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (editingItem) {
        await updateItem(editingItem.id, values);

        message.success("Item updated successfully");
      } else {
        await createItem(values);

        message.success("Item added successfully");
      }

      form.resetFields();
      setEditingItem(null);
      setOpen(false);

      loadItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteItem(id);

      message.success("Item deleted successfully");

      loadItems();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Delete failed"
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
          marginBottom: 25,
        }}
      >
        <Col>
          <Space size={16}>
            <Avatar
              size={60}
              style={{
                background:
                  "linear-gradient(135deg,#1677ff,#69b1ff)",
              }}
              icon={<ShoppingOutlined />}
            />

            <div>
              <Title
                level={2}
                style={{
                  marginBottom: 0,
                }}
              >
                Items
              </Title>

              <Text type="secondary">
                Manage your inventory items
              </Text>
            </div>
          </Space>
        </Col>

        <Col>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            style={{
              borderRadius: 12,
              height: 46,
              paddingInline: 24,
            }}
            onClick={() => {
              setEditingItem(null);
              form.resetFields();
              setOpen(true);
            }}
          >
            Add Item
          </Button>
        </Col>
      </Row>

      <Input
        size="large"
        allowClear
        prefix={<SearchOutlined />}
        placeholder="Search item..."
        style={{
          width: 380,
          marginBottom: 25,
          borderRadius: 12,
        }}
        onChange={(e) => {
          const value = e.target.value.toLowerCase();

          const filtered = allItems.filter((item: any) =>
            item.name.toLowerCase().includes(value)
          );

          setItems(filtered);
        }}
      />
      <Table
        rowKey="id"
        loading={loading}
        dataSource={items}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          position: ["bottomRight"],
        }}
        onRow={() => ({
          style: {
            cursor: "pointer",
            transition: "all .25s ease",
          },
        })}
        columns={[
          {
            title: "Item",
            width: 320,
            render: (_: any, record: any) => (
              <Space size={14}>
                <Avatar
                  size={42}
                  style={{
                    background:
                      "linear-gradient(135deg,#1677ff,#69b1ff)",
                    fontWeight: 700,
                  }}
                  icon={<InboxOutlined />}
                />

                <div>
                  <Text
                    strong
                    style={{
                      fontSize: 15,
                    }}
                  >
                    {record.name}
                  </Text>

                  <br />

                  <Text
                    type="secondary"
                    style={{
                      fontSize: 12,
                    }}
                  >
                    Inventory Item
                  </Text>
                </div>
              </Space>
            ),
          },
          {
            title: "Price",
            width: 180,
            render: (_: any, record: any) => (
              <Space>
                <DollarOutlined
                  style={{
                    color: "#1677ff",
                  }}
                />

                <Text
                  strong
                  style={{
                    color: "#1677ff",
                  }}
                >
                  ₹ {Number(record.price).toFixed(2)}
                </Text>
              </Space>
            ),
          },
          {
            title: "Stock",
            width: 180,
            render: (_: any, record: any) => {
              if (record.stock === 0) {
                return (
                  <Tag
                    color="red"
                    style={{
                      borderRadius: 20,
                      padding: "2px 12px",
                    }}
                  >
                    Out of Stock
                  </Tag>
                );
              }

              if (record.stock <= 5) {
                return (
                  <Tag
                    color="orange"
                    style={{
                      borderRadius: 20,
                      padding: "2px 12px",
                    }}
                  >
                    {record.stock} Left
                  </Tag>
                );
              }

              return (
                <Tag
                  color="green"
                  style={{
                    borderRadius: 20,
                    padding: "2px 12px",
                  }}
                >
                  {record.stock} Available
                </Tag>
              );
            },
          },
          {
            title: "Actions",
            align: "center",
            width: 220,
            render: (_: any, record: any) => (
              <Space size={10}>
                <Button
                  icon={<EditOutlined />}
                  style={{
                    borderRadius: 10,
                  }}
                  onClick={() => {
                    setEditingItem(record);
                    form.setFieldsValue(record);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>

                <Popconfirm
                  icon={
                    <DeleteOutlined
                      style={{
                        color: "#ff4d4f",
                      }}
                    />
                  }
                  title="Delete Item?"
                  description="This action cannot be undone."
                  okText="Delete"
                  cancelText="Cancel"
                  overlayClassName="delete-popconfirm"
                  okButtonProps={{
                    danger: true,
                    style: {
                      borderRadius: 10,
                    },
                  }}
                  cancelButtonProps={{
                    style: {
                      borderRadius: 10,
                    },
                  }}
                  onConfirm={() =>
                    handleDelete(record.id)
                  }
                >
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    style={{
                      borderRadius: 10,
                    }}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />
      <Modal
        open={open}
        centered
        width={550}
        destroyOnHidden
        title={
          <Space>
            <Avatar
              style={{
                background: editingItem
                  ? "#faad14"
                  : "#1677ff",
              }}
              icon={
                editingItem ? (
                  <EditOutlined />
                ) : (
                  <PlusOutlined />
                )
              }
            />

            <div>
              <Title
                level={4}
                style={{
                  margin: 0,
                }}
              >
                {editingItem
                  ? "Edit Item"
                  : "Add Item"}
              </Title>

              <Text type="secondary">
                {editingItem
                  ? "Update inventory item"
                  : "Create a new inventory item"}
              </Text>
            </div>
          </Space>
        }
        okText={editingItem ? "Update" : "Save"}
        cancelText="Cancel"
        onOk={handleSave}
        onCancel={() => {
          setOpen(false);
          setEditingItem(null);
          form.resetFields();
        }}
      >
        <Form
          layout="vertical"
          form={form}
          style={{
            marginTop: 20,
          }}
        >
          <Form.Item
            label="Item Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter item name",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<InboxOutlined />}
              placeholder="Enter item name"
              style={{
                borderRadius: 10,
              }}
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please enter price",
              },
            ]}
          >
            <InputNumber
              size="large"
              min={1}
              prefix="₹"
              style={{
                width: "100%",
                borderRadius: 10,
              }}
              placeholder="Enter item price"
            />
          </Form.Item>

          <Form.Item
            label="Stock"
            name="stock"
            rules={[
              {
                required: true,
                message: "Please enter stock",
              },
            ]}
          >
            <InputNumber
              size="large"
              min={0}
              style={{
                width: "100%",
                borderRadius: 10,
              }}
              placeholder="Enter available stock"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}