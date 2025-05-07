"use client";

import React, { ReactElement, useEffect, useState } from "react";
import SideMenu from "../molecules/SideMenu";
import { MenuTheme } from "antd";
import Initializer from "../atoms/Initializer";

type IGeneralPageContainer = {
  children?: ReactElement;
};

export default function GeneralPageContainer({
  children,
}: IGeneralPageContainer) {
  const [menuTheme, setMenuTheme] = useState<MenuTheme>("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("menuTheme");
    if (savedTheme) {
      setMenuTheme(savedTheme as MenuTheme);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("menuTheme", menuTheme);
    }
  }, [menuTheme, isMounted]);

  const changeThemeAction = (value: boolean) => {
    setMenuTheme(value ? "dark" : "light");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className={`general-page-container container-fluid ${menuTheme}`}>
      <Initializer />
      <SideMenu menuTheme={menuTheme} changeThemeAction={changeThemeAction} />
      <div className="page-content">{children}</div>
    </div>
  );
}
