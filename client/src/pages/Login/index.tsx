import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Typography,
  Checkbox,
  Divider,
  Avatar,
  message,
} from "antd";

import {
  MailOutlined,
  LockOutlined,
  ShopOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

import { login } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";

import "./login.css";

const { Title, Paragraph, Text } = Typography;

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const data = await login(values);

      localStorage.setItem("token", data.token);

      message.success("Login Successful");

      navigate("/dashboard");

    } catch (error: any) {

      message.error(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (

    <div className="login-page">

      {/* Animated Background */}

      <div className="bg-circle bg1"></div>
      <div className="bg-circle bg2"></div>
      <div className="bg-circle bg3"></div>
      <div className="bg-circle bg4"></div>

      <Card className="login-card" bordered={false}>

        <Row
          gutter={0}
          style={{
            minHeight: 560,
          }}
        >

          {/* LEFT PANEL */}

          <Col
            xs={0}
            md={11}
            className="login-left"
          >

            <img
              src={logo}
              alt="Retail Inventory"
              className="company-logo"
            />

            <Title
              level={1}
              className="company-title"
            >
              Retail Inventory
            </Title>

            <Title
              level={2}
              className="company-subtitle"
            >
              Management System
            </Title>

            <Paragraph className="company-description">

              Manage your customers, inventory,
              billing and invoices seamlessly
              from one powerful dashboard.

            </Paragraph>

            <div className="feature-list">

              <div className="feature-item">

                <SafetyCertificateOutlined />

                Secure JWT Authentication

              </div>

              <div className="feature-item">

                <ShopOutlined />

                Inventory & Billing Management

              </div>

              <div className="feature-item">

                📊 Dashboard Analytics

              </div>

              <div className="feature-item">

                🧾 Invoice Generation

              </div>

            </div>

          </Col>

          {/* RIGHT PANEL */}

          <Col
            xs={24}
            md={13}
            className="login-right"
          >

            <Avatar
              size={70}
              className="login-avatar"
              icon={<ShopOutlined />}
            />

            <Title
              level={1}
              className="signin-title"
            >
              Sign in
            </Title>

            <Text className="signin-text">

              Enter your credentials to access
              the dashboard.

            </Text>

            <br />
            <br />

            <Form
              layout="vertical"
              onFinish={onFinish}
>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined />}
                  placeholder="Enter your email address"
                  className="login-input"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
                  className="login-input"
                />
              </Form.Item>

              <Row
                justify="space-between"
                align="middle"
                style={{
                  marginBottom: 20,
                }}
              >
                <Checkbox>
                  Remember me
                </Checkbox>

                <Button
                  type="link"
                  style={{
                    padding: 0,
                    color: "#198754",
                    fontWeight: 600,
                  }}
                >
                  Forgot Password?
                </Button>
              </Row>

              <Button
                htmlType="submit"
                type="primary"
                size="large"
                block
                className="signin-btn"
              >
                Sign In
              </Button>

              <Divider>
                <Text type="secondary">
                  Secure Login
                </Text>
              </Divider>

              <div
                style={{
                  textAlign: "center",
                }}
              >
                <SafetyCertificateOutlined
                  style={{
                    fontSize: 28,
                    color: "#198754",
                    marginBottom: 10,
                  }}
                />

                <br />

                <Text
                  type="secondary"
                  style={{
                    fontSize: 13,
                  }}
                >
                  Your data is protected using
                  JWT Authentication.
                </Text>
              </div>
            </Form>

            <div className="login-footer">

              <Text>
                © {new Date().getFullYear()} Retail Inventory
                Management System
              </Text>

            </div>

          </Col>

        </Row>

      </Card>

    </div>

  );
}