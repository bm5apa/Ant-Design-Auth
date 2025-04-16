import React, { ReactElement } from "react";
// import Initializer from "../atoms/Initializer";

type IGeneralPageContainer = {
  children?: ReactElement;
};

export default function GeneralPageContainer({
  children,
}: IGeneralPageContainer) {
  return (
    <div className="general-page-container container-fluid">
      {/* <Initializer /> */}
      {children}
    </div>
  );
}
