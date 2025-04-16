"use client";

import Dashboard from "@/component/molecules/Dashboard";
import GeneralPageContainer from "@/component/organisms/GeneralPageContainer";

export default function Page() {
  return (
    <GeneralPageContainer>
      <div className="page-content dashboard-page">
        <Dashboard />
      </div>
    </GeneralPageContainer>
  );
}
