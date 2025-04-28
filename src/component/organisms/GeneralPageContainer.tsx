"use client";

import React, { ReactElement } from "react";
import SideMenu from "../molecules/SideMenu";
// import Initializer from "../atoms/Initializer";

type IGeneralPageContainer = {
  children?: ReactElement;
};

export default function GeneralPageContainer({
  children,
}: IGeneralPageContainer) {
  return (
    <div className="general-page-container container-fluid">
      <SideMenu />
      <div className="page-content">
        {/* <Initializer /> */}
        {children}
      </div>
    </div>
  );
}
