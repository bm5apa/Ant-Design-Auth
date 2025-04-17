"use client";

import LoginTable from "@/component/molecules/LoginTable";
import GeneralPageContainer from "@/component/organisms/GeneralPageContainer";
import { Button, Divider, message, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const { Title } = Typography;

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const showLoginFirst = params.redirect === "login-first";

  useEffect(() => {
    if (showLoginFirst) {
      message.error("Please login first!");
      const timer = setTimeout(() => {
        router.replace("/login");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [params]);

  return (
    <GeneralPageContainer>
      <>
        <Title level={2}>Welcome to Login Page</Title>
        <Divider />
        <LoginTable />
        <Divider />
        <Button size="large" href="/">
          Back to Homepage
        </Button>
      </>
    </GeneralPageContainer>
  );
}
