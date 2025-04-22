import { Button, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

export default function InsideContent() {
  return (
    <div className="inside-content__container">
      <Title level={2}>Inside Content</Title>
      <Text>This Page Can Only Be Seen After Login.</Text>
      <div style={{ marginTop: 20 }}>
        <Button size="large" href="/dashboard">
          Back to the Dashboard
        </Button>
      </div>
    </div>
  );
}
