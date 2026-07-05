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
    Row,
    Col,
    Avatar,
} from "antd";

import {
    UserOutlined,
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    MailOutlined,
    PhoneOutlined,
} from "@ant-design/icons";

import {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} from "../../services/customer.service";

import "./customer.css";

const { Title, Text } = Typography;

export default function Customers() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [allCustomers, setAllCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] =
        useState<any>(null);

    const [form] = Form.useForm();

    const loadCustomers = async () => {
        try {
            setLoading(true);

            const data = await getCustomers();

            setCustomers(data);
            setAllCustomers(data);
        } catch {
            message.error("Failed to load customers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    const handleSave = async () => {
        try {
            const values = await form.validateFields();

            if (editingCustomer) {
                await updateCustomer(editingCustomer.id, values);

                message.success("Customer updated successfully");
            } else {
                await createCustomer(values);

                message.success("Customer added successfully");
            }

            form.resetFields();
            setEditingCustomer(null);
            setOpen(false);

            loadCustomers();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteCustomer(id);

            message.success("Customer deleted successfully");

            loadCustomers();
        } catch (error: any) {
            message.error(
                error?.response?.data?.message || "Delete Failed"
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
                            icon={<UserOutlined />}
                        />

                        <div>
                            <Title
                                level={2}
                                style={{
                                    marginBottom: 0,
                                }}
                            >
                                Customers
                            </Title>

                            <Text type="secondary">
                                Manage all your customers in one place
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
                            setEditingCustomer(null);
                            form.resetFields();
                            setOpen(true);
                        }}
                    >
                        Add Customer
                    </Button>
                </Col>
            </Row>

            <Input
                size="large"
                allowClear
                prefix={<SearchOutlined />}
                placeholder="Search customer by name or email..."
                style={{
                    width: 380,
                    marginBottom: 25,
                    borderRadius: 12,
                }}
                onChange={(e) => {
                    const value = e.target.value.toLowerCase();

                    const filtered = allCustomers.filter(
                        (customer: any) =>
                            customer.name.toLowerCase().includes(value) ||
                            customer.email.toLowerCase().includes(value)
                    );

                    setCustomers(filtered);
                }}
            />
            <Table
                rowKey="id"
                loading={loading}
                dataSource={customers}
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
                        title: "Customer",
                        width: 280,
                        render: (_: any, record: any) => (
                            <Space size={14}>
                                <Avatar
                                    size={42}
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#1677ff,#69b1ff)",
                                        fontWeight: 700,
                                    }}
                                >
                                    {record.name.charAt(0).toUpperCase()}
                                </Avatar>

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
                                        Customer
                                    </Text>
                                </div>
                            </Space>
                        ),
                    },
                    {
                        title: "Email",
                        render: (_: any, record: any) => (
                            <Space>
                                <MailOutlined
                                    style={{
                                        color: "#1677ff",
                                    }}
                                />

                                <Text>{record.email}</Text>
                            </Space>
                        ),
                    },
                    {
                        title: "Phone",
                        width: 220,
                        render: (_: any, record: any) => (
                            <Space>
                                <PhoneOutlined
                                    style={{
                                        color: "#16a34a",
                                    }}
                                />

                                <Text>{record.phone}</Text>
                            </Space>
                        ),
                    },
                    {
                        title: "Actions",
                        width: 220,
                        align: "center",
                        render: (_: any, record: any) => (
                            <Space>
                                <Button
                                    icon={<EditOutlined />}
                                    style={{
                                        borderRadius: 10,
                                    }}
                                    onClick={() => {
                                        setEditingCustomer(record);
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
                                                fontSize: 18,
                                            }}
                                        />
                                    }
                                    title="Delete Customer?"
                                    description="This action cannot be undone."
                                    okText="Delete"
                                    cancelText="Cancel"
                                    okButtonProps={{
                                        danger: true,
                                        size: "large",
                                        style: {
                                            borderRadius: 10,
                                            minWidth: 90,
                                            fontWeight: 600,
                                        },
                                    }}
                                    cancelButtonProps={{
                                        size: "large",
                                        style: {
                                            borderRadius: 10,
                                            minWidth: 90,
                                        },
                                    }}
                                    overlayClassName="delete-popconfirm"
                                    onConfirm={() => handleDelete(record.id)}
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
                                background: editingCustomer
                                    ? "#faad14"
                                    : "#1677ff",
                            }}
                            icon={
                                editingCustomer ? (
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
                                {editingCustomer
                                    ? "Edit Customer"
                                    : "Add Customer"}
                            </Title>

                            <Text type="secondary">
                                {editingCustomer
                                    ? "Update customer information"
                                    : "Create a new customer"}
                            </Text>
                        </div>
                    </Space>
                }
                okText={editingCustomer ? "Update" : "Save"}
                cancelText="Cancel"
                onOk={handleSave}
                onCancel={() => {
                    setOpen(false);
                    setEditingCustomer(null);
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
                        label="Customer Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter customer name",
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={<UserOutlined />}
                            placeholder="Enter customer name"
                            style={{
                                borderRadius: 10,
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Please enter a valid email",
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={<MailOutlined />}
                            placeholder="Enter email address"
                            style={{
                                borderRadius: 10,
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Please enter phone number",
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={<PhoneOutlined />}
                            placeholder="Enter phone number"
                            style={{
                                borderRadius: 10,
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
}