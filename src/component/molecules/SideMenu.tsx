"use client";

import React, { useEffect, useState } from "react";
import { BulbOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

export default function SideMenu() {
  const getInitialSelectedKey = () => {
    const currentPath = window.location.pathname;
    return [pathToKeyMap[currentPath] || "1"];
  };

  const [stateOpenKeys, setStateOpenKeys] = useState(["sub1", "sub2"]);
  const [stateSelectedKeys, setStateSelectedKeys] = useState<string[]>(
    getInitialSelectedKey()
  );

  const onClick: MenuProps["onClick"] = (e) => {
    setStateSelectedKeys([e.key]);
  };

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    if (currentOpenKey !== undefined) {
      setStateOpenKeys(
        openKeys.filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  useEffect(() => {
    const handlePathChange = () => {
      setStateSelectedKeys(getInitialSelectedKey());
    };
    window.addEventListener("popstate", handlePathChange);
    return () => {
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);

  return (
    <Menu
      onClick={onClick}
      style={{ width: 300 }}
      selectedKeys={stateSelectedKeys}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      items={items}
    />
  );
}

const items: MenuItem[] = [
  {
    key: "sub1",
    label: "Side Menu",
    icon: <BulbOutlined />,
    children: [
      {
        key: "g1",
        label: "Basic Page",
        type: "group",
        children: [
          { key: "1", label: <a href="/">Homepage</a> },
          { key: "2", label: <a href="/login">Login</a> },
          { key: "3", label: <a href="/sign-up">Sign Up</a> },
          { key: "4", label: <a href="/reset">Reset Password</a> },
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

const pathToKeyMap: Record<string, string> = {
  "/": "1",
  "/login": "2",
  "/sign-up": "3",
  "/reset": "4",
  "/dashboard": "5",
  "/content": "6",
};

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
