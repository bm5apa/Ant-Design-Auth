"use client";

import React, { useEffect, useState } from "react";
import { BulbOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps, MenuTheme } from "antd";
import { Menu, Switch, Button } from "antd";
import { KEY_MAP_TO_PATH } from "@/utils/const";
import { usePathname } from "next/navigation";
import { useGlobalStore } from "@/stores/global.store";

type MenuItem = Required<MenuProps>["items"][number];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

type ISideMenu = {
  menuTheme: MenuTheme;
  changeThemeAction: (value: boolean) => void;
};

export default function SideMenu({ menuTheme, changeThemeAction }: ISideMenu) {
  const { width } = useGlobalStore((state) => state.screenSize);
  const isTabletOrMobile = width <= 800;
  const pathname = usePathname();

  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const savedKeys = localStorage.getItem("menuOpenKeys");
      return savedKeys ? JSON.parse(savedKeys) : [];
    }
    return [];
  });

  const getValidKeys = (items: MenuItem[]): string[] => {
    const keys: string[] = [];
    const extractKeys = (item: MenuItem) => {
      if (
        item &&
        "key" in item &&
        !("children" in item || item.type === "group")
      ) {
        keys.push(item.key as string);
      }
      if (item && "children" in item && item.children) {
        item.children.forEach(extractKeys);
      }
    };
    items.forEach(extractKeys);
    return keys;
  };

  const validKeys = getValidKeys(items);

  const getSelectedKey = () => {
    const mapItem = KEY_MAP_TO_PATH.find((item) => item.path === pathname);
    const key = mapItem ? mapItem.key : "1";
    return validKeys.includes(key) ? [key] : ["1"];
  };

  const [stateSelectedKeys, setStateSelectedKeys] = useState<string[]>(
    getSelectedKey()
  );

  const onClick: MenuProps["onClick"] = (e) => {
    const key = e.key;
    if (validKeys.includes(key)) {
      setStateSelectedKeys([key]);
      console.log("Clicked key:", key, "New selectedKeys:", [key]);
    } else {
      console.warn("Invalid key clicked:", key);
    }
  };

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const validSubmenuKeys = ["sub1", "sub2"];
    const newOpenKeys = openKeys.filter((key) =>
      validSubmenuKeys.includes(key)
    );
    setStateOpenKeys(newOpenKeys);
    localStorage.setItem("menuOpenKeys", JSON.stringify(newOpenKeys));
    console.log("onOpenChange triggered, newOpenKeys:", newOpenKeys);
  };

  useEffect(() => {
    const newKeys = getSelectedKey();
    setStateSelectedKeys(newKeys);
    console.log(
      "Path changed, new selectedKeys:",
      newKeys,
      "pathname:",
      pathname
    );
  }, [pathname]);

  return (
    <div className={`side-menu__container ${menuTheme}`}>
      <Menu
        onClick={onClick}
        style={{ width: isTabletOrMobile ? 75 : 200 }}
        selectedKeys={stateSelectedKeys}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        mode={isTabletOrMobile ? "vertical" : "inline"}
        items={items}
      />
      <div className="side-menu__switch">
        <Switch
          checked={menuTheme === "dark"}
          onChange={changeThemeAction}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </div>
    </div>
  );
}

const items: MenuItem[] = [
  {
    key: "sub1",
    label: "Basic Menu",
    icon: <BulbOutlined />,
    children: [
      {
        key: "g1",
        label: "",
        type: "group",
        children: [
          { key: "1", label: <a href="/">Homepage</a> },
          { key: "2", label: <a href="/login">Login</a> },
          { key: "3", label: <a href="/sign-up">Sign Up</a> },
          { key: "4", label: <a href="/reset">Forget Password</a> },
        ],
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub2",
    label: "Member Menu",
    icon: <MenuUnfoldOutlined />,
    children: [
      {
        key: "g2",
        label: "Please Login First ......",
        type: "group",
        children: [
          { key: "5", label: <a href="/dashboard">Dashboard</a> },
          { key: "6", label: <a href="/content">Content</a> },
        ],
      },
    ],
  },
];

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);
