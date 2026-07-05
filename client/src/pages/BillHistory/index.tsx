import { useEffect, useState, useRef } from "react";
import {
  Card,
  Typography,
  Table,
  Tag,
  message,
  Modal,
  Button,
  Space,
  Input,
  Avatar,
  Tooltip,
} from "antd";

import {
  SearchOutlined,
  EyeOutlined,
  DeleteOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useReactToPrint } from "react-to-print";

import {
  getBills,
  getBillById,
  deleteBill,
} from "../../services/bill.service";

import { Popconfirm } from "antd";

import Invoice from "../../components/Invoice/Invoice";

import "./billHistory.css";

const { Title, Text } = Typography;

export default function BillHistory() {
  const [bills, setBills] = useState<any[]>([]);
  const [allBills, setAllBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<any>(null);

  const invoiceRef = useRef<HTMLDivElement>(null);

  const loadBills = async () => {
    try {
      setLoading(true);

      const data = await getBills();

      setBills(data);
      setAllBills(data);
    } catch {
      message.error("Failed to load bills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBills();
  }, []);

  const handleView = async (id: number) => {
    try {
      const data = await getBillById(id);

      setSelectedBill(data);

      setOpen(true);
    } catch {
      message.error("Failed to load invoice");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBill(id);

      message.success("Bill deleted successfully");

      loadBills();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Delete failed"
      );
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `Invoice-${selectedBill?.bill?.id}`,
  });

  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 20,
        boxShadow: "0 15px 35px rgba(0,0,0,.08)",
      }}
    >
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        <Space size={16}>
          <Avatar
            size={58}
            style={{
              background:
                "linear-gradient(135deg,#1677ff,#69b1ff)",
            }}
            icon={<FileTextOutlined />}
          />

          <div>
            <Title
              level={2}
              style={{
                marginBottom: 0,
              }}
            >
              Bill History
            </Title>

            <Text type="secondary">
              View and manage generated invoices
            </Text>
          </div>
        </Space>

        <Button
          type="primary"
          ghost
          icon={<FileTextOutlined />}
          style={{
            borderRadius: 10,
          }}
        >
          {bills.length} Bills
        </Button>
      </Space>

      <Input
        allowClear
        size="large"
        prefix={<SearchOutlined />}
        placeholder="Search Bill ID..."
        style={{
          width: 320,
          marginBottom: 25,
          borderRadius: 12,
        }}
        onChange={(e) => {
          const value = e.target.value.toLowerCase();

          if (!value) {
            setBills(allBills);
            return;
          }

          setBills(
            allBills.filter((bill: any) =>
              String(bill.id).includes(value)
            )
          );
        }}
      />
      <Table
        rowKey="id"
        loading={loading}
        dataSource={bills}
        pagination={{
          pageSize: 8,
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
            title: "Bill",
            width: 220,
            render: (_: any, record: any) => (
              <Space size={14}>
                <Avatar
                  style={{
                    background:
                      "linear-gradient(135deg,#1677ff,#69b1ff)",
                  }}
                  icon={<FileTextOutlined />}
                />

                <div>
                  <Text
                    strong
                    style={{
                      fontSize: 15,
                    }}
                  >
                    Bill #{record.id}
                  </Text>

                  <br />

                  <Text
                    type="secondary"
                    style={{
                      fontSize: 12,
                    }}
                  >
                    Invoice
                  </Text>
                </div>
              </Space>
            ),
          },
          {
            title: "Customer",
            width: 240,
            render: (_: any, record: any) => (
              <Space size={12}>
                <Avatar
                  style={{
                    background: "#52c41a",
                  }}
                  icon={<UserOutlined />}
                />

                <div>
                  <Text strong>
                    {record.customer || `Customer #${record.customerId}`}
                  </Text>

                  <br />

                  <Text type="secondary">
                    ID : {record.customerId}
                  </Text>
                </div>
              </Space>
            ),
          },
          {
            title: "Total",
            width: 170,
            render: (_: any, record: any) => (
              <Tag
                color="blue"
                style={{
                  borderRadius: 20,
                  padding: "4px 14px",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                ₹ {Number(record.total).toFixed(2)}
              </Tag>
            ),
          },
          {
            title: "Status",
            width: 150,
            render: (_: any, record: any) => (
              <Tag
                color="green"
                style={{
                  borderRadius: 20,
                  padding: "4px 14px",
                  fontWeight: 600,
                }}
              >
                {record.status}
              </Tag>
            ),
          },
          {
            title: "Created",
            width: 220,
            render: (_: any, record: any) => (
              <Text>
                {new Date(
                  record.createdAt
                ).toLocaleString()}
              </Text>
            ),
          },
          {
            title: "Actions",
            align: "center",
            width: 220,
            render: (_: any, record: any) => (
              <Space size={10}>
                <Tooltip title="View Invoice">
                  <Button
                    type="primary"
                    icon={<EyeOutlined />}
                    style={{
                      borderRadius: 10,
                    }}
                    onClick={() =>
                      handleView(record.id)
                    }
                  >
                    View
                  </Button>
                </Tooltip>

                <Popconfirm
                  title="Delete Bill?"
                  description="This action cannot be undone."
                  okText="Delete"
                  cancelText="Cancel"
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
                  <Tooltip title="Delete Bill">
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      style={{
                        borderRadius: 10,
                      }}
                    >
                      Delete
                    </Button>
                  </Tooltip>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />
      <Modal
        open={open}
        centered
        width={950}
        footer={null}
        closable={false}
        destroyOnClose
        onCancel={() => setOpen(false)}
        styles={{
          mask: {
            backdropFilter: "blur(12px)",
            background: "rgba(0,0,0,.30)",
          },
          content: {
            background: "transparent",
            boxShadow: "none",
            padding: 0,
          },
          body: {
            padding: 0,
            background: "transparent",
          },
        }}
      >
        {selectedBill && (
          <Invoice
            ref={invoiceRef}
            bill={selectedBill}
            onClose={() => setOpen(false)}
            onPrint={handlePrint}
          />
        )}
      </Modal>

    </Card>
  );
}