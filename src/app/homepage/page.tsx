"use client";

import GeneralPageContainer from "@/component/organisms/GeneralPageContainer";
import { Welcome } from "@ant-design/x";
import { Button, Divider } from "antd";

export default function Page() {
  return (
    <GeneralPageContainer>
      <>
        <Welcome variant="borderless" title="This is Homepage" />
        <Divider />
        <Button size="large" href="/login">
          Enter the Login Page
        </Button>
      </>
    </GeneralPageContainer>
  );
}
