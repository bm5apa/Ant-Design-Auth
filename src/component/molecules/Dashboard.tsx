import React, { useEffect, useState } from "react";
import { Card, Typography, Button, message } from "antd";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState<{ username: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Please Login in First!");
      router.push("/login");
      return;
    }

    setUserInfo({
      username: "admin",
    });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Login Out!");
    router.push("/login");
  };

  return (
    <div className="dashboard-container" style={{ padding: "24px" }}>
      <Card>
        <Title level={2}>Welcome back!</Title>
        {userInfo && (
          <div>
            <Text strong>You are login as:</Text>
            <Text>{userInfo.username}</Text>
          </div>
        )}
        <div style={{ marginTop: "20px" }}>
          <Button type="primary" danger onClick={handleLogout}>
            Login Out
          </Button>
        </div>
      </Card>
    </div>
  );
}
