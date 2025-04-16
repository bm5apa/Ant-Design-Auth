"use client";

import GeneralPageContainer from "@/component/organisms/GeneralPageContainer";
import { Welcome } from "@ant-design/x";
import { Button, Divider } from "antd";

export default function Page() {
  return (
    <GeneralPageContainer>
      <div className="page-content homepage">
        <Welcome variant="borderless" title="This is Homepage" />
        <Divider />
        <Button size="large" href="/login">
          Login
        </Button>
      </div>
    </GeneralPageContainer>
  );
}
