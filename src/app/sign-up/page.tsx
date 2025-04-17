"use client";

import SignUpTable from "@/component/molecules/SignUpTable";
import GeneralPageContainer from "@/component/organisms/GeneralPageContainer";
import { Button, Divider, Typography } from "antd";

const { Title } = Typography;

export default function Page() {
  return (
    <GeneralPageContainer>
      <>
        <Title level={2}>Welcome to Sign Up Page</Title>
        <Divider />
        <SignUpTable />
        <Divider />
        <Button size="large" href="/login">
          Back to Login Page
        </Button>
      </>
    </GeneralPageContainer>
  );
}
