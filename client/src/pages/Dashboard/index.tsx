import { useEffect, useState } from "react";
import {
    Card,
    Row,
    Col,
    Typography,
    Table,
    message,
    Avatar,
    Space,
    Tag,
} from "antd";
import {
    UserOutlined,
    ShoppingOutlined,
    FileTextOutlined,
    DollarOutlined,
} from "@ant-design/icons";
import { getDashboard } from "../../services/dashboard.service";
import "./dashboard.css";

const { Title, Text } = Typography;

export default function Dashboard() {
    const [data, setData] = useState<any>(null);

    const loadDashboard = async () => {
        try {
            const result = await getDashboard();
            setData(result);
        } catch {
            message.error("Failed to load dashboard");
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    if (!data) return null;

    const statCardStyle = (
        background: string
    ): React.CSSProperties => ({
        borderRadius: 18,
        border: "none",
        background,
        color: "#fff",
        cursor: "pointer",
        boxShadow: "0 15px 35px rgba(0,0,0,.15)",
        transition: "all .3s ease",
    });

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: 30,
                background:
                    "linear-gradient(135deg,#f3f7ff 0%, #eef5ff 45%, #ffffff 100%)",
            }}
        >
            <Title
                level={2}
                style={{
                    marginBottom: 30,
                    fontWeight: 700,
                }}
            >
                📊 Dashboard Overview
            </Title>

            <Row gutter={[20, 20]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card
                        hoverable
                        style={statCardStyle(
                            "linear-gradient(135deg,#11998e,#38ef7d)"
                        )}
                    >
                        <UserOutlined style={{ fontSize: 32 }} />

                        <br />
                        <br />

                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 16,
                            }}
                        >
                            Customers
                        </Text>

                        <Title
                            level={2}
                            style={{
                                color: "#fff",
                                marginTop: 10,
                            }}
                        >
                            {data.totalCustomers}
                        </Title>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card
                        hoverable
                        style={statCardStyle(
                            "linear-gradient(135deg,#ff9966,#ff5e62)"
                        )}
                    >
                        <ShoppingOutlined style={{ fontSize: 32 }} />

                        <br />
                        <br />

                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 16,
                            }}
                        >
                            Items
                        </Text>

                        <Title
                            level={2}
                            style={{
                                color: "#fff",
                                marginTop: 10,
                            }}
                        >
                            {data.totalItems}
                        </Title>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card
                        hoverable
                        style={statCardStyle(
                            "linear-gradient(135deg,#667eea,#764ba2)"
                        )}
                    >
                        <FileTextOutlined style={{ fontSize: 32 }} />

                        <br />
                        <br />

                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 16,
                            }}
                        >
                            Bills
                        </Text>

                        <Title
                            level={2}
                            style={{
                                color: "#fff",
                                marginTop: 10,
                            }}
                        >
                            {data.totalBills}
                        </Title>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card
                        hoverable
                        style={statCardStyle(
                            "linear-gradient(135deg,#36d1dc,#5b86e5)"
                        )}
                    >
                        <DollarOutlined style={{ fontSize: 32 }} />

                        <br />
                        <br />

                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 16,
                            }}
                        >
                            Revenue
                        </Text>

                        <Title
                            level={2}
                            style={{
                                color: "#fff",
                                marginTop: 10,
                            }}
                        >
                            ₹ {data.totalRevenue}
                        </Title>
                    </Card>
                </Col>
            </Row>
            <Card
                style={{
                    marginTop: 35,
                    borderRadius: 20,
                    overflow: "hidden",
                    border: "none",
                    boxShadow: "0 15px 35px rgba(0,0,0,.08)",
                }}
                bodyStyle={{
                    padding: 0,
                }}
            >
                <div
                    style={{
                        background: "linear-gradient(135deg,#667eea,#764ba2)",
                        color: "#fff",
                        padding: "18px 24px",
                        fontSize: 18,
                        fontWeight: 600,
                    }}
                >
                    🧾 Latest Bills
                </div>

                <Table
                    rowKey="id"
                    pagination={false}
                    bordered={false}
                    size="middle"
                    dataSource={data.latestBills}
                    className="latest-bills"
                    columns={[
                        {
                            title: "Bill",
                            width: 120,
                            render: (_: any, record: any) => (
                                <Tag
                                    color="blue"
                                    style={{
                                        borderRadius: 20,
                                        padding: "4px 14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    #{record.id}
                                </Tag>
                            ),
                        },
                        {
                            title: "Customer",
                            width: 300,
                            render: (_: any, record: any) => (
                                <Space size={12}>
                                    <Avatar
                                        style={{
                                            background: "#1677ff",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {record.customer.charAt(0).toUpperCase()}
                                    </Avatar>

                                    <span
                                        style={{
                                            fontWeight: 600,
                                            fontSize: 15,
                                        }}
                                    >
                                        {record.customer}
                                    </span>
                                </Space>
                            ),
                        },
                        {
                            title: "Amount",
                            width: 180,
                            align: "right",
                            render: (_: any, record: any) => (
                                <span
                                    style={{
                                        color: "#16a34a",
                                        fontWeight: 700,
                                        fontSize: 16,
                                    }}
                                >
                                    ₹ {record.total}
                                </span>
                            ),
                        },
                    ]}
                    onRow={() => ({
                        style: {
                            cursor: "pointer",
                            transition: "all .25s ease",
                        },
                    })}
                />
            </Card>
        </div>
    );
}