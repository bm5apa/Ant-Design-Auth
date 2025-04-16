import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
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
        message.success("Login successful!");
        if (values.remember) {
          localStorage.setItem("token", response.data.token);
        }
        router.push("/dashboard");
      } else {
        message.error(response.data.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error details:", error);
      if (error.response) {
        message.error(error.response.data.message || "Login failed");
      } else if (error.request) {
        message.error(
          "No response from server. Please check your network connection."
        );
      } else {
        message.error("Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Validation failed:", errorInfo);
    message.error("Please fill in all required fields");
  };

  return (
    <div className="login-table__container">
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
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
