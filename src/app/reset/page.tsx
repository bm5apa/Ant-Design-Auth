"use client";

import LoginTable from "@/component/molecules/LoginTable";
import ResetTable from "@/component/molecules/ResetTable";
import GeneralPageContainer from "@/component/organisms/GeneralPageContainer";
import { Button, Divider, message, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const { Title } = Typography;

export default function Page() {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const params = Object.fromEntries(searchParams.entries());
  // const showLoginFirst = params.redirect === "login-first";

  return (
    <GeneralPageContainer>
      <>
        <Title level={2}>Reset Your Password</Title>
        <Divider />
        <ResetTable />
        <Divider />
        <Button size="large" href="/login">
          Back to Login Page
        </Button>
      </>
    </GeneralPageContainer>
  );
}
