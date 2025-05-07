"use client";

import React, { ReactElement, useEffect, useState } from "react";
import SideMenu from "../molecules/SideMenu";
import { MenuTheme } from "antd";
// import Initializer from "../atoms/Initializer";

type IGeneralPageContainer = {
  children?: ReactElement;
};

export default function GeneralPageContainer({
  children,
}: IGeneralPageContainer) {
  const [menuTheme, setMenuTheme] = useState<MenuTheme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("menuTheme");
      return (savedTheme as MenuTheme) || "light";
    }
    return "light";
  });

  useEffect(() => {
    localStorage.setItem("menuTheme", menuTheme);
  }, [menuTheme]);

  const changeTheme = (value: boolean) => {
    setMenuTheme(value ? "dark" : "light");
  };

  return (
    <div className={`general-page-container container-fluid ${menuTheme}`}>
      <SideMenu menuTheme={menuTheme} changeTheme={changeTheme} />
      <div className="page-content">
        {/* <Initializer /> */}
        {children}
      </div>
    </div>
  );
}
