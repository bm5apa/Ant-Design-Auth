"use client";

import LoginTable from "@/component/molecules/LoginTable";
import GeneralPageContainer from "@/component/organisms/GeneralPageContainer";
import { Button, Divider, Typography } from "antd";

const { Title } = Typography;

export default function Page() {
  return (
    <GeneralPageContainer>
      <div className="page-content homepage">
        <Title level={2}>Welcome to Login Page</Title>
        <Divider />
        <LoginTable />
        <Divider />
        <Button size="large" href="/">
          Back to Homepage
        </Button>
      </div>
    </GeneralPageContainer>
  );
}
