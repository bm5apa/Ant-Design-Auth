import { Button, Typography } from "antd";
import React from "react";

const { Title } = Typography;

export default function InsideContent() {
  return (
    <div className="inside-content__container">
      <Title level={2}>Inside Content</Title>
      <div style={{ marginTop: 20 }}>
        <Button size="large" href="/dashboard">
          Back to the User Dashboard
        </Button>
      </div>
    </div>
  );
}
