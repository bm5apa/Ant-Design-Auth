"use client";

import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

export type FieldType = {
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
        message.success("Login successfully! Redirect Now...");
        document.cookie = `token=${response.data.token}; path=/; max-age=86400`;
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        message.error(response.data.message || "Login Failed.");
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error("Login error details:", error);
      if (axiosError.response) {
        message.error(
          axiosError.response.data?.message ||
            "Login Failed, Please Check the Username and Password."
        );
      } else if (axiosError.request) {
        message.error(
          "Unable to Connect to the Server, Please Check the Internet Connection."
        );
      } else {
        message.error("Login Failed, Please Try Again Later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Validation failed:", errorInfo);
    message.warning("Please Fill In All the Required Section.");
  };

  return (
    <div className="login-table__container">
      <Spin spinning={loading} tip="Login Now...">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please Input Your Username!" }]}
          >
            <Input placeholder="eg: admin1234" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please Input Your Password!" }]}
          >
            <Input.Password placeholder="eg: admin1111" />
          </Form.Item>
          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>Remember Me</Checkbox>
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button type="link" htmlType="button" href="/sign-up">
              Sign Up
            </Button>
          </Form.Item>
          <Form.Item label={null}>
            <Button type="link" htmlType="button" href="/reset">
              Forget Password
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
}
