"use client";

import React, { useEffect, useState } from "react";
import { BulbOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { KEY_MAP_TO_PATH } from "@/utils/const";

type MenuItem = Required<MenuProps>["items"][number];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

export default function SideMenu() {
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

  const getInitialSelectedKey = () => {
    const currentPath = window.location.pathname;
    const mapItem = KEY_MAP_TO_PATH.find((item) => item.path === currentPath);
    const key = mapItem ? mapItem.key : "1";
    return validKeys.includes(key) ? [key] : ["1"];
  };

  const [stateOpenKeys, setStateOpenKeys] = useState(["sub1", "sub2"]);
  const [stateSelectedKeys, setStateSelectedKeys] = useState<string[]>(
    getInitialSelectedKey()
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
      const newKeys = getInitialSelectedKey();
      setStateSelectedKeys(newKeys);
      console.log("Path changed, new selectedKeys:", newKeys);
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
