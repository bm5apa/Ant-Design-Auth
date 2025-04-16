import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

type AxiosError = {
  response?: {
    data?: {
      message?: string;
    };
  };
  request?: XMLHttpRequest;
  message?: string;
};

export default function LoginTable() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setLoading(true);

      console.log("Attempting login with:", values);
      const response = await axios.post("/api/login", {
        username: values.username,
        password: values.password,
      });

      console.log("Login response:", response.data);

      if (response.data.success) {
        message.success("登录成功！正在跳转...");

        if (values.remember) {
          localStorage.setItem("token", response.data.token);
        }

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        message.error(response.data.message || "登录失败");
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error("Login error details:", error);

      if (axiosError.response) {
        message.error(
          axiosError.response.data?.message || "登录失败，请检查用户名和密码"
        );
      } else if (axiosError.request) {
        message.error("无法连接到服务器，请检查网络连接");
      } else {
        message.error("登录失败，请稍后重试");
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Validation failed:", errorInfo);
    message.warning("请填写所有必填字段");
  };

  return (
    <div className="login-table__container">
      <Spin spinning={loading} tip="正在登录中...">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
}
