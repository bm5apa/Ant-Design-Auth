import React, { useEffect } from "react";
import { Card, Typography, Button, App } from "antd";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function Dashboard() {
  const router = useRouter();
  const { message } = App.useApp();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      message.error("Please login first");
      router.replace("/login");
    }
  }, [message, router]);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.replace("/login");
  };

  return (
    <div className="dashboard__container">
      <Card>
        <Title level={2}>Welcome to Dashboard</Title>
        <Text>You are now logged in.</Text>
        <div style={{ marginTop: 20 }}>
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
}
