"use client";

import LoginTable from "@/component/molecules/LoginTable";
import GeneralPageContainer from "@/component/organisms/GeneralPageContainer";
import { Welcome } from "@ant-design/x";
import { Button, Divider } from "antd";

export default function Page() {
  return (
    <GeneralPageContainer>
      <div className="page-content homepage">
        <Welcome variant="borderless" title="This is Login-page" />
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
