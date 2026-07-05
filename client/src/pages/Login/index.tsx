import { Button, Card, Form, Input, Typography, message } from "antd";
import { login } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Login() {
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        try {
            const data = await login(values);

            localStorage.setItem("token", data.token);

            message.success("Login Successful");

            navigate("/dashboard");

        } catch (error: any) {
            message.error(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f5f5",
            }}
        >
            <Card style={{ width: 400 }}>
                <Title level={3}>Retail Inventory Login</Title>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button htmlType="submit" type="primary" block>
                        Login
                    </Button>
                </Form>
            </Card>
        </div>
    );
}