"use client";

import InsideContent from "@/component/atoms/InsideContent";
import GeneralPageContainer from "@/component/organisms/GeneralPageContainer";
import { Button } from "antd";

export default function Page() {
  return (
    <GeneralPageContainer>
      <>
        <InsideContent />
        <div style={{ marginTop: 20 }}>
          <Button size="large" href="/dashboard">
            Back to the User Dashboard
          </Button>
        </div>
      </>
    </GeneralPageContainer>
  );
}
