"use client";

import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
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

export default function SignUpTable() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const validateInput = (field: string) => (_: any, value: string) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, [field]: "Required!" }));
      return Promise.reject(new Error("Required!"));
    }
    const alphabetCount = (value.match(/[a-zA-Z]/g) || []).length;
    const numberCount = (value.match(/[0-9]/g) || []).length;

    if (alphabetCount < 4 || numberCount < 4) {
      const errorMsg = "Must contain at least 4 letters and 4 numbers!";
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
      return Promise.reject(new Error(errorMsg));
    }
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
    return Promise.resolve();
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      console.log("Attempting sign-up with:", values);
      const response = await axios.post("/api/signup", {
        username: values.username,
        password: values.password,
      });
      console.log("Sign-up response:", response.data);
      if (response.data.success) {
        message.success("Sign up successful! Redirecting...");
        document.cookie = `token=${response.data.token}; path=/; max-age=86400`;
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        message.error(response.data.message || "Sign up failed.");
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error("Sign up error details:", error);
      if (axiosError.response) {
        message.error(
          axiosError.response.data?.message ||
            "Sign up failed. Please check your username and password."
        );
      } else if (axiosError.request) {
        message.error(
          "Unable to connect to the server. Please check your internet connection."
        );
      } else {
        message.error("Sign up failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Validation failed:", errorInfo);
    message.warning("Please fill in all required fields correctly.");
  };

  return (
    <div className="signup-table__container">
      <Spin spinning={loading} tip="Signing up...">
        <Form
          name="signup"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            validateStatus={errors.username ? "warning" : undefined}
            help={errors.username}
            rules={[
              { required: true, message: "Please input your username!" },
              { validator: validateInput("username") },
            ]}
          >
            <Input placeholder="e.g., aaaa1111" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Password"
            name="password"
            validateStatus={errors.password ? "warning" : undefined}
            help={errors.password}
            rules={[
              { required: true, message: "Please input your password!" },
              { validator: validateInput("password") },
            ]}
          >
            <Input.Password placeholder="e.g., aaaa1111" />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
}
