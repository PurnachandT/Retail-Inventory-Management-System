import { Layout, Menu, Button, Typography, Avatar, Space } from "antd";
import {
    DashboardOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    HistoryOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

export default function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const pageTitles: Record<string, string> = {
        "/dashboard": "Dashboard",
        "/customers": "Customers",
        "/items": "Items",
        "/billing": "Billing",
        "/bill-history": "Bill History",
    };

    const currentTitle =
        pageTitles[location.pathname] || "Retail Inventory";

    return (
        <Layout
            style={{
                minHeight: "100vh",
                background: "#f4f7fb",
            }}
        >
            {/* Sidebar */}
            <Sider
                width={250}
                style={{
                    background: "#0f172a",
                    boxShadow: "4px 0 20px rgba(0,0,0,.08)",
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "22px 18px",
                        borderBottom: "1px solid rgba(255,255,255,.08)",
                    }}
                >
                    <img
                        src={logo}
                        alt="Retail Inventory"
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            objectFit: "cover",
                            background: "#fff",
                            padding: 4,
                        }}
                    />

                    <div>
                        <div
                            style={{
                                color: "#fff",
                                fontSize: 20,
                                fontWeight: 700,
                            }}
                        >
                            Retail Inventory
                        </div>

                        <div
                            style={{
                                color: "#9ca3af",
                                fontSize: 14,
                            }}
                        >
                            Management System
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname.replace("/", "")]}
                    onClick={({ key }) => navigate(`/${key}`)}
                    style={{
                        background: "#0f172a",
                        borderRight: 0,
                        marginTop: 15,
                    }}
                    items={[
                        {
                            key: "dashboard",
                            icon: <DashboardOutlined />,
                            label: "Dashboard",
                        },
                        {
                            key: "customers",
                            icon: <UserOutlined />,
                            label: "Customers",
                        },
                        {
                            key: "items",
                            icon: <ShoppingOutlined />,
                            label: "Items",
                        },
                        {
                            key: "billing",
                            icon: <ShoppingCartOutlined />,
                            label: "Billing",
                        },
                        {
                            key: "bill-history",
                            icon: <HistoryOutlined />,
                            label: "Bill History",
                        },
                    ]}
                />
            </Sider>

            {/* Main */}
            <Layout>
                {/* Header */}
                <Header
                    style={{
                        background: "#ffffff",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 28px",
                        boxShadow: "0 3px 12px rgba(0,0,0,.06)",
                    }}
                >
                    <Title
                        level={3}
                        style={{
                            margin: 0,
                            color: "#1e293b",
                            fontWeight: 700,
                        }}
                    >
                        {currentTitle}
                    </Title>

                    <Button
                        danger
                        type="primary"
                        icon={<LogoutOutlined />}
                        size="large"
                        style={{
                            borderRadius: 10,
                            paddingInline: 22,
                        }}
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/");
                        }}
                    >
                        Logout
                    </Button>
                </Header>

                {/* Page Content */}
                <Content
                    style={{
                        padding: 24,
                        overflow: "auto",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}